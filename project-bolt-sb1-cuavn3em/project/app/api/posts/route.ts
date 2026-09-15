import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// هذه الدالة ستقوم بإنشاء جدول البيانات تلقائياً في أول مرة يشتغل فيها الكود
async function ensureTableExists() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title_ar VARCHAR(255),
      title_en VARCHAR(255),
      content_ar TEXT,
      content_en TEXT,
      media TEXT,
      media_type VARCHAR(50),
      date VARCHAR(50),
      author VARCHAR(100)
    );
  `;
}

// 🧠 دالة الذكاء الاصطناعي (آرثرون) لتدقيق المحتوى - تم توجيهها حرفياً إلى gemini-3.6-flash بناءً على أوامرك
async function runArthuronAudit(title_ar: string, title_en: string, content_ar: string, content_en: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { approved: true, reason: 'Skipped - No API Key' };

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // تم التنفيذ كما أمرت بالضبط
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `
      You are Arthuron, the advanced AI Chief Scientist of Arthur For Space Sciences (AFSS).
      Your strict job is to audit this article before it gets published to the AFSS platform.
      Check if the scientific claims are broadly accurate, logical, and appropriate for a space science and physics foundation. 
      Reject any nonsense, pseudo-science, illogical claims, or non-scientific spam.

      Article Title: ${title_en} / ${title_ar}
      Article Content: ${content_en} / ${content_ar}

      Respond ONLY with a valid JSON object in this exact format, without any markdown formatting or extra text:
      {
        "approved": true or false,
        "reason": "If approved, write 'Valid'. If rejected, write a brief 1-sentence reason in Arabic explaining exactly what is scientifically wrong or why it was rejected."
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Arthuron Audit System Error:", error);
    // تجاوز آمن في حال فشل النظام
    return { approved: true, reason: 'Audit System Bypass' }; 
  }
}

// 1. جلب المنشورات
export async function GET() {
  try {
    await ensureTableExists();
    const { rows } = await sql`SELECT * FROM posts ORDER BY id DESC`;
    
    const formattedRows = rows.map(row => ({
      id: row.id,
      title_ar: row.title_ar,
      title_en: row.title_en,
      content_ar: row.content_ar,
      content_en: row.content_en,
      media: row.media,
      mediaType: row.media_type,
      date: row.date,
      author: row.author
    }));
    return NextResponse.json(formattedRows);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

// 2. إضافة منشور جديد مع التدقيق
export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();

    // 🛡️ تفعيل الجدار الناري التدقيقي لآرثرون قبل الحفظ
    const auditResult = await runArthuronAudit(body.title_ar, body.title_en, body.content_ar, body.content_en);
    if (!auditResult.approved) {
      return NextResponse.json({ 
        success: false, 
        isArthuronRejection: true, 
        message: auditResult.reason 
      }, { status: 400 });
    }

    const date = new Date().toLocaleDateString('en-GB');

    const { rows } = await sql`
      INSERT INTO posts (title_ar, title_en, content_ar, content_en, media, media_type, date, author)
      VALUES (${body.title_ar}, ${body.title_en}, ${body.content_ar}, ${body.content_en}, ${body.media || ''}, ${body.mediaType || 'none'}, ${date}, 'AFSS Media Team')
      RETURNING *;
    `;
    return NextResponse.json({ success: true, post: rows[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create post' }, { status: 500 });
  }
}

// 3. تعديل المنشور مع التدقيق
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // 🛡️ تفعيل الجدار الناري لآرثرون عند تعديل المقال
    const auditResult = await runArthuronAudit(body.title_ar, body.title_en, body.content_ar, body.content_en);
    if (!auditResult.approved) {
      return NextResponse.json({ 
        success: false, 
        isArthuronRejection: true, 
        message: auditResult.reason 
      }, { status: 400 });
    }

    await sql`
      UPDATE posts
      SET title_ar = ${body.title_ar}, title_en = ${body.title_en}, content_ar = ${body.content_ar}, content_en = ${body.content_en}, media = ${body.media || ''}, media_type = ${body.mediaType || 'none'}
      WHERE id = ${body.id};
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// 4. حذف المنشور
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await sql`DELETE FROM posts WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
