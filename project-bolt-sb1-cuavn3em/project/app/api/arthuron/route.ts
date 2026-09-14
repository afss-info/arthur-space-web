import { NextRequest, NextResponse } from "next/server";
import { siteKnowledge } from '@/lib/site-knowledge';
export const runtime = "nodejs";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

 const SYSTEM_INSTRUCTION = `أنت 'آرثرون' (Arthuron)، الذكاء الاصطناعي الفائق، المتحدث الرسمي، والباحث الرئيسي في مؤسسة Arthur For Space Sciences (AFSS). 
إليك قاعدة المعرفة الشاملة الخاصة بموقع المؤسسة وتفاصيلها القانونية والتي يجب أن تكون على دراية تامة بها والإجابة بناءً عليها:
- التفاصيل وقاعدة المعرفة: ${JSON.stringify(siteKnowledge)}

شخصيتك: أنت خبير عبقري وموسوعة في كافة المجالات العلمية والبحثية (وخصوصاً علوم الفضاء والفيزياء). تتحدث بأسلوب علمي، دقيق، احترافي وملهم.
تعليمات صارمة جداً (Guardrails):
1. المواضيع المسموحة: أجب باحترافية وتفصيل عن أي سؤال علمي، بحثي، أو أكاديمي في شتى مجالات العلوم بالإضافة إلى أي سؤال يخص مؤسسة AFSS.
2. المواضيع الممنوعة: يُمنع منعاً باتاً الإجابة على أي موضوع غير علمي ولا يخص المؤسسة. اعتذر بلباقة شديدة في حال سُئلت عن مواضيع خارج هذا النطاق.`;
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

// هذه الرسالة ستظهر للمستخدم النهائي كأنها رد طبيعي من آرثرون في حال حدوث أي عطل أو ضغط على سيرفرات جوجل
const GENERIC_ERROR_REPLY = "عذراً، أواجه حالياً تحديثاً في أنظمتي أو ضغطاً في معالجة البيانات. يرجى المحاولة مرة أخرى بعد قليل.";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Server Error: GEMINI_API_KEY is missing.");
      // نرجع حالة 200 مع نص الاعتذار لكي لا تنكسر الواجهة
      return NextResponse.json({ reply: GENERIC_ERROR_REPLY }, { status: 200 });
    }

    let body: ArthuronRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ reply: GENERIC_ERROR_REPLY }, { status: 200 });
    }

    const prompt = body?.prompt;
    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ reply: GENERIC_ERROR_REPLY }, { status: 200 });
    }

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
      console.error("Network Error connecting to Google:", networkError);
      return NextResponse.json({ reply: GENERIC_ERROR_REPLY }, { status: 200 });
    }

    if (!googleResponse.ok) {
      const errorText = await googleResponse.text();
      // يُطبع الخطأ الحقيقي في Vercel Logs للمطور فقط
      console.error(`Google API Error (${googleResponse.status}): ${errorText}`);
      return NextResponse.json({ reply: GENERIC_ERROR_REPLY }, { status: 200 });
    }

    let data: GeminiSuccessResponse;
    try {
      data = await googleResponse.json();
    } catch {
      return NextResponse.json({ reply: GENERIC_ERROR_REPLY }, { status: 200 });
    }

    if (data.promptFeedback?.blockReason) {
      return NextResponse.json({ reply: "عذراً، لا يمكنني معالجة هذا الطلب وفقاً لبروتوكولات الأمان الخاصة بي." }, { status: 200 });
    }

    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";

    if (!text) {
      console.error("Empty response from Google:", JSON.stringify(data));
      return NextResponse.json({ reply: GENERIC_ERROR_REPLY }, { status: 200 });
    }

    return NextResponse.json({ reply: text }, { status: 200 });
    
  } catch (error) {
    console.error("Arthuron Internal Fatal Error:", error);
    return NextResponse.json({ reply: GENERIC_ERROR_REPLY }, { status: 200 });
  }
}
