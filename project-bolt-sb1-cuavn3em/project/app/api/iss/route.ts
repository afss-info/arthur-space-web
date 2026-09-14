import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // جلب بيانات الإحداثيات وعدد الرواد في نفس اللحظة
    const [issRes, astrosRes] = await Promise.all([
      fetch('http://api.open-notify.org/iss-now.json', { cache: 'no-store' }), // إحداثيات حية بدون كاش
      fetch('http://api.open-notify.org/astros.json', { next: { revalidate: 3600 } })
    ]);

    const issData = await issRes.json();
    const astrosData = await astrosRes.json();

    return NextResponse.json({
      latitude: issData.iss_position.latitude,
      longitude: issData.iss_position.longitude,
      crewInSpace: astrosData.number
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ISS data' }, { status: 500 });
  }
}
