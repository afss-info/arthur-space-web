import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // بافتراض أنك تستخدم قاعدة بيانات Vercel

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. توليد الجدول تلقائياً إذا لم يكن موجوداً (هندسة ذاتية البناء)
    await sql`
      CREATE TABLE IF NOT EXISTS afss_waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. إدخال الإيميل في قاعدة البيانات (وإذا كان موجوداً مسبقاً، يتجاهله بصمت)
    await sql`
      INSERT INTO afss_waitlist (email) 
      VALUES (${email}) 
      ON CONFLICT (email) DO NOTHING;
    `;

    return NextResponse.json({ success: true, message: 'Signature logged securely.' });
    
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to secure uplink' }, { status: 500 });
  }
}
