import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, target } = await request.json();
    if (!text) return NextResponse.json({ translatedText: '' });

    // دعم ترجمة نص واحد أو مصفوفة نصوص دفعة واحدة
    const textsToTranslate = Array.isArray(text) ? text : [text];
    
    const translations = await Promise.all(
      textsToTranslate.map(async (t) => {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(t)}`);
        const data = await res.json();
        return data[0].map((item: any) => item[0]).join('');
      })
    );

    return NextResponse.json({ 
      translatedText: Array.isArray(text) ? translations : translations[0] 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed', translatedText: text }, { status: 500 });
  }
}
