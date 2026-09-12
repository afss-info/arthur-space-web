import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // جلب أحدث الأوراق البحثية في الفيزياء الفلكية التي تحتوي على ملفات PDF مجانية
    const response = await fetch('https://api.semanticscholar.org/graph/v1/paper/search?query=astrophysics+space+exploration&limit=15&fields=title,url,abstract,year,authors,openAccessPdf', {
      next: { revalidate: 3600 } // تحديث كل ساعة
    });

    if (!response.ok) {
      throw new Error('Failed to fetch research papers');
    }

    const data = await response.json();
    
    // فلترة الأوراق لنعرض فقط التي تمتلك رابط PDF مجاني (Open Access)
    const freePapers = data.data
      .filter((paper: any) => paper.openAccessPdf !== null)
      .slice(0, 4); // عرض أحدث 4 أوراق فقط

    return NextResponse.json(freePapers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch papers' }, { status: 500 });
  }
}
