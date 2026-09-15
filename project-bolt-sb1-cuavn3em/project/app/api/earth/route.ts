import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`, {
      next: { revalidate: 3600 }
    });
    const data = await response.json();

    if (data && data.length > 0) {
      const latest = data[0];
      const dateString = latest.date.split(' ')[0].replace(/-/g, '/');
      // استخدام JPG بدلاً من PNG لضمان سرعة التحميل وعدم اختفاء الصورة
      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${dateString}/jpg/${latest.image}.jpg?api_key=${apiKey}`;
      return NextResponse.json({ ...latest, imageUrl });
    }
    return NextResponse.json({ error: 'No images found' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Earth data' }, { status: 500 });
  }
}
