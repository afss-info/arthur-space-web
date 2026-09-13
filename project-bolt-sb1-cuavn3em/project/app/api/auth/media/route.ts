import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // جلب البيانات السرية من بيئة Vercel
    const validEmail = process.env.MEDIA_EMAIL;
    const validPassword = process.env.MEDIA_PASSWORD;

    // التحقق من التطابق
    if (email === validEmail && password === validPassword) {
      return NextResponse.json({ success: true });
    }

    // في حال الخطأ
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
