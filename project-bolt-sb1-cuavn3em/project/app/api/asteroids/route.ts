import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    
    // الحصول على تاريخ اليوم ديناميكياً
    const today = new Date().toISOString().split('T')[0];

    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`, {
      next: { revalidate: 3600 } // تحديث كل ساعة
    });

    if (!response.ok) throw new Error('NASA API Failed');

    const data = await response.json();
    
    // استخراج الكويكبات الخاصة باليوم فقط وأخذ أخطر/أكبر 4 منها
    const todayAsteroids = data.near_earth_objects[today].slice(0, 4).map((ast: any) => ({
      name: ast.name,
      isHazardous: ast.is_potentially_hazardous_asteroid,
      speed: parseFloat(ast.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2),
      missDistance: parseFloat(ast.close_approach_data[0].miss_distance.lunar).toFixed(2), // البعد بالمسافة القمرية
      size: parseFloat(ast.estimated_diameter.meters.estimated_diameter_max).toFixed(0)
    }));

    return NextResponse.json(todayAsteroids);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Asteroids' }, { status: 500 });
  }
}
