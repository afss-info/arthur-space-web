import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

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

// 1. جلب المنشورات (لن تختفي بعد اليوم!)
export async function GET() {
  try {
    await ensureTableExists();
    const { rows } = await sql`SELECT * FROM posts ORDER BY id DESC`;
    
    // إعادة تهيئة البيانات لتناسب الواجهة
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

// 2. إضافة منشور جديد
export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
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

// 3. تعديل المنشور
export async function PUT(request: Request) {
  try {
    const body = await request.json();
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
