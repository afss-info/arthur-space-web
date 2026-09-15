import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    
    // الرابط الرسمي والأسرع لـ EPIC API
    const response = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`, {
      next: { revalidate: 3600 } // تحديث كل ساعة لتجنب الحظر
    });

    // إذا قامت ناسا بحظر الطلب (Rate Limit) ننتقل للطوارئ فوراً
    if (!response.ok) {
      throw new Error(`NASA Firewall Active: Status ${response.status}`);
    }

    const data = await response.json();

    // التأكد من أن البيانات مصفوفة وتحتوي على صور
    if (Array.isArray(data) && data.length > 0) {
      const latest = data[0];
      const dateString = latest.date.split(' ')[0].replace(/-/g, '/');
      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${dateString}/jpg/${latest.image}.jpg?api_key=${apiKey}`;
      
      return NextResponse.json({ ...latest, imageUrl });
    }

    throw new Error('No images found in NASA Database');

  } catch (error) {
    console.error("Earth API Protocol Interrupted:", error);
    
    // 🛡️ بروتوكول الطوارئ الإلهي: لن ينكسر الباك إند أبداً بعد اليوم
    return NextResponse.json({
      caption: "Secure Earth Feed (Fallback Protocol Active due to NASA secure connection limit).",
      date: new Date().toISOString().split('T')[0],
      centroid_coordinates: { lat: 25.3463, lon: 55.4209 }, // Coordinates Fallback
      imageUrl: "https://epic.gsfc.nasa.gov/assets/img/epic_earth.png" // صورة احتياطية رسمية ثابتة
    });
  }
}
