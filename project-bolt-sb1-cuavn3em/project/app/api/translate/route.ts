import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, target } = await request.json();
    if (!text) return NextResponse.json({ translatedText: '' });
    
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    const translatedText = data[0].map((item: any) => item[0]).join('');
    
    return NextResponse.json({ translatedText });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
