import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, target } = await request.json();
    if (!text) return NextResponse.json({ translatedText: '' });

    // تحويل النص إلى مصفوفة حتى لو كان نصاً واحداً لتوحيد المعالجة
    const textsToTranslate = Array.isArray(text) ? text : [text];
    const translations = [];

    // استخدام المعالجة المتسلسلة (For Loop) بدلاً من (Promise.all) لمنع حظر الـ IP من جوجل
    for (const t of textsToTranslate) {
      try {
        // استخدام POST بدلاً من GET لتجاوز مشكلة "النص الطويل جداً" (مثل مقالات ناسا)
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ q: t }).toString(),
        });
        
        if (!res.ok) throw new Error('Translation API Error');
        
        const data = await res.json();
        // جوجل تقسم النصوص الطويلة لمقاطع، يجب تجميعها كلها
        const translatedPart = data[0].map((item: any) => item[0]).join('');
        translations.push(translatedPart);
      } catch (e) {
        console.error('Chunk translation failed:', e);
        // في حال فشل مقطع معين، نعيد النص الأصلي كي لا ينكسر الموقع أبداً
        translations.push(t); 
      }
    }

    return NextResponse.json({ 
      translatedText: Array.isArray(text) ? translations : translations[0] 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed', translatedText: null }, { status: 500 });
  }
}
