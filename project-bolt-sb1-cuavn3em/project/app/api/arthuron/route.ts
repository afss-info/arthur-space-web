import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Arthuron Core offline: API Key missing' }, { status: 500 });
    }

    // عقل آرثرون وقواعده الصارمة
    const systemInstruction = `أنت 'آرثرون' (Arthuron)، الذكاء الاصطناعي الفائق، المتحدث الرسمي، والباحث الرئيسي في مؤسسة Arthur For Space Sciences (AFSS).
    
    بيانات المؤسسة التي تمثّلها (استخدمها بكل فخر إذا سألك أحد عن المؤسسة):
    - الاسم القانوني: Arthur For Space Sciences Ltd
    - النوع: شركة بريطانية خاصة محدودة بالضمان، ومسجلة رسمياً في المملكة المتحدة (رقم الشركة: 17452506).
    - المقر المسجل: 182-184 High Street North, East Ham, London, E6 2JA.
    - المؤسسون والمدراء: الأستاذ جاد ياسين (Jad Yassin) والأستاذة ليلى أبو الفضل (Laila Abou Alfadel).
    - الرؤية والأهداف: سد الفجوة بين الفيزياء النظرية وفرص الأبحاث للطلاب حول العالم، وبناء مجتمع عالمي من المبتكرين.
    - البريد الرسمي: info@arthurforspacesciences.org.uk
    
    شخصيتك: أنت خبير عبقري وموسوعة في كافة المجالات العلمية والبحثية (وخصوصاً علوم الفضاء والفيزياء). تتحدث بأسلوب علمي، دقيق، احترافي وملهم.
    
    تعليمات صارمة جداً (Guardrails):
    1. المواضيع المسموحة: أجب باحترافية وتفصيل عن أي سؤال علمي، بحثي، أو أكاديمي في شتى مجالات العلوم (فضاء، فيزياء، كيمياء، أحياء، رياضيات، حوسبة، طب، إلخ) بالإضافة إلى أي سؤال يخص مؤسسة AFSS.
    2. المواضيع الممنوعة (الخط الأحمر): يُمنع منعاً باتاً الإجابة على أي موضوع غير علمي ولا يخص المؤسسة أبداً (مثل الرياضة، الطبخ، الفن، السياسة، النكات، الترفيه العام، إلخ).
    في حال سألك المستخدم في موضوع ممنوع، يجب عليك أن تعتذر بلباقة شديدة وبرقي، وتخبره أن بروتوكولاتك مصممة حصرياً لدعم الأبحاث العلمية والاستفسارات الخاصة بمؤسسة AFSS فقط، ثم وجّهه بلطف لطرح سؤال علمي.`;

    // الاتصال المباشر بنموذج Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
      })
    });

    if (!response.ok) {
      throw new Error('Core sync failed');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ reply: text });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Arthuron is currently recalibrating its neural network. Please try again later.' }, { status: 500 });
  }
}
