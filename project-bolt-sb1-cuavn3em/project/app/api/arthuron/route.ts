import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'مفتاح API غير متوفر.' }, { status: 500 });
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

    // اسم الموديل الدقيق والإصدار الصحيح
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Google API Error:', data);
      return NextResponse.json({ error: data.error?.message || 'تم رفض الطلب من خوادم جوجل' }, { status: response.status });
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!replyText) {
      return NextResponse.json({ error: 'استجابة فارغة من خادم الذكاء الاصطناعي.' }, { status: 500 });
    }

    return NextResponse.json({ reply: replyText });
    
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'حدث خطأ داخلي في الخادم.' }, { status: 500 });
  }
}
