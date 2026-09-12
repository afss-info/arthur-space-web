import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY;
    
    // التحقق من وجود المفتاح في Vercel
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key is missing in Vercel' }, { status: 500 });
    }

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
      // تحديث البيانات كل ساعة (3600 ثانية) لتخفيف الضغط على المفتاح
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from NASA');
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch NASA data' }, { status: 500 });
  }
}
