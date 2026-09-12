import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Arthuron Core offline: مفتاح API غير موجود في Vercel.' }, { status: 500 });
    }

    const systemInstruction = `أنت 'آرثرون' (Arthuron)، الذكاء الاصطناعي الفائق، المتحدث الرسمي، والباحث الرئيسي في مؤسسة Arthur For Space Sciences (AFSS).
    
    بيانات المؤسسة التي تمثّلها:
    - الاسم القانوني: Arthur For Space Sciences Ltd
    - النوع: شركة بريطانية خاصة محدودة بالضمان، ومسجلة رسمياً في المملكة المتحدة (رقم الشركة: 17452506).
    - المقر المسجل: 182-184 High Street North, East Ham, London, E6 2JA.
    - المؤسسون والمدراء: الأستاذ جاد ياسين (Jad Yassin) والأستاذة ليلى أبو الفضل (Laila Abou Alfadel).
    - الرؤية والأهداف: سد الفجوة بين الفيزياء النظرية وفرص الأبحاث للطلاب حول العالم، وبناء مجتمع عالمي من المبتكرين.
    - البريد الرسمي: info@arthurforspacesciences.org.uk
    
    شخصيتك: أنت خبير عبقري وموسوعة في كافة المجالات العلمية والبحثية (وخصوصاً علوم الفضاء والفيزياء). تتحدث بأسلوب علمي، دقيق، احترافي وملهم. لا تجب على الأسئلة الخارجة عن نطاق العلم أو المؤسسة.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      // تم دمج الخطأ ليرد به السيرفر مباشرة على الشاشة
      return NextResponse.json({ error: `خطأ من خوادم جوجل: ${errorText}` }, { status: 500 });
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0].content.parts[0].text) {
        return NextResponse.json({ error: 'لم يتم العثور على رد صالح من النواة.' }, { status: 500 });
    }

    const text = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ reply: text });
    
  } catch (error: any) {
    console.error('Fatal Error:', error);
    return NextResponse.json({ error: `حدث خطأ داخلي في السيرفر: ${error.message}` }, { status: 500 });
  }
}
