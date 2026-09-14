import { NextResponse } from 'next/server';

// ذاكرة مؤقتة لحفظ المنشورات (للتجربة الحية الآن)
let globalPosts: any[] = [];

export async function GET() {
  // ترتيب المنشورات من الأحدث للأقدم
  const sortedPosts = [...globalPosts].sort((a, b) => b.id - a.id);
  return NextResponse.json(sortedPosts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newPost = {
      id: Date.now(),
      title_ar: body.title_ar,
      title_en: body.title_en,
      content_ar: body.content_ar,
      content_en: body.content_en,
      image: body.image, // سيتم حفظ الصورة كنص Base64
      date: new Date().toLocaleDateString('en-GB'),
      author: 'AFSS Media Team'
    };

    globalPosts.push(newPost);
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create post' }, { status: 500 });
  }
}
