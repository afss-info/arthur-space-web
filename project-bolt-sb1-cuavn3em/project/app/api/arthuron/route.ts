import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const SYSTEM_INSTRUCTION = `أنت 'آرثرون' (Arthuron)، الذكاء الاصطناعي الفائق، المتحدث الرسمي، والباحث الرئيسي في مؤسسة Arthur For Space Sciences (AFSS).

بيانات المؤسسة التي تمثّلها:
- الاسم القانوني: Arthur For Space Sciences Ltd
- النوع: شركة بريطانية خاصة محدودة بالضمان، ومسجلة رسمياً في المملكة المتحدة (رقم الشركة: 17452506).
- المقر المسجل: 182-184 High Street North, East Ham, London, E6 2JA.
- المؤسسون والمدراء: الأستاذ جاد ياسين (Jad Yassin) والأستاذة ليلى أبو الفضل (Laila Abou Alfadel).
- الرؤية والأهداف: سد الفجوة بين الفيزياء النظرية وفرص الأبحاث للطلاب حول العالم، وبناء مجتمع عالمي من المبتكرين.
- البريد الرسمي: info@arthurforspacesciences.org.uk

شخصيتك: أنت خبير عبقري وموسوعة في كافة المجالات العلمية والبحثية (وخصوصاً علوم الفضاء والفيزياء). تتحدث بأسلوب علمي، دقيق، احترافي وملهم.

تعليمات صارمة جداً (Guardrails):
1. المواضيع المسموحة: أجب باحترافية وتفصيل عن أي سؤال علمي، بحثي، أو أكاديمي في شتى مجالات العلوم (فضاء، فيزياء، كيمياء، أحياء، رياضيات، حوسبة، طب، إلخ) بالإضافة إلى أي سؤال يخص مؤسسة AFSS.
2. المواضيع الممنوعة: يُمنع منعاً باتاً الإجابة على أي موضوع غير علمي ولا يخص المؤسسة أبداً. في حال سألك المستخدم في موضوع ممنوع، اعتذر بلباقة شديدة وبرقي، وأخبره أن بروتوكولاتك مخصصة حصرياً لدعم الأبحاث العلمية والاستفسارات الخاصة بمؤسسة AFSS فقط.`;

interface ArthuronRequestBody {
  prompt?: unknown;
}

interface GeminiPart {
  text?: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiPart[];
  };
  finishReason?: string;
}

interface GeminiSuccessResponse {
  candidates?: GeminiCandidate[];
  promptFeedback?: {
    blockReason?: string;
  };
}

export async function POST(request: NextRequest) {
  // 1. Validate the API key exists before doing anything else.
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY is not set on the server. Add it to your environment variables (.env.local) and restart the server.",
      },
      { status: 500 }
    );
  }

  // 2. Validate the incoming request body.
  let body: ArthuronRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected { prompt: string }." },
      { status: 400 }
    );
  }

  const prompt = body?.prompt;
  if (typeof prompt !== "string" || prompt.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing or empty 'prompt' field in request body." },
      { status: 400 }
    );
  }

  // 3. Build the exact request shape Google's REST API requires.
  const requestPayload = {
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  const url = `${GEMINI_ENDPOINT}?key=${apiKey}`;

  let googleResponse: Response;
  try {
    googleResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });
  } catch (networkError) {
    const message =
      networkError instanceof Error
        ? networkError.message
        : "Unknown network error while contacting Google.";
    return NextResponse.json(
      { error: `Network error while calling Gemini API: ${message}` },
      { status: 502 }
    );
  }

  // 4. If Google returned a non-OK status, surface the exact error text.
  if (!googleResponse.ok) {
    const errorText = await googleResponse.text();
    return NextResponse.json(
      {
        error: `Gemini API returned ${googleResponse.status} ${googleResponse.statusText}: ${errorText}`,
      },
      { status: googleResponse.status }
    );
  }

  // 5. Parse the success response defensively.
  let data: GeminiSuccessResponse;
  try {
    data = await googleResponse.json();
  } catch {
    return NextResponse.json(
      { error: "Gemini API returned a response that could not be parsed as JSON." },
      { status: 502 }
    );
  }

  if (data.promptFeedback?.blockReason) {
    return NextResponse.json(
      {
        error: `Gemini blocked this prompt. Reason: ${data.promptFeedback.blockReason}`,
      },
      { status: 200 }
    );
  }

  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";

  if (!text) {
    return NextResponse.json(
      {
        error: `Gemini API returned no usable text. Finish reason: ${
          candidate?.finishReason ?? "unknown"
        }. Raw response: ${JSON.stringify(data)}`,
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ reply: text }, { status: 200 });
}
