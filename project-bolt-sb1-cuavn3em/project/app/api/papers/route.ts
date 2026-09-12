import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // استخدام قاعدة بيانات OpenAlex المفتوحة والمجانية مع إضافة بريد المؤسسة لضمان عدم الحظر (Polite Pool)
    const response = await fetch('https://api.openalex.org/works?search=astrophysics+space&filter=has_fulltext:true,open_access.is_oa:true&per-page=4&sort=publication_date:desc&mailto=info@arthurforspacesciences.org.uk', {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch research papers');
    }

    const data = await response.json();
    
    // إعادة صياغة البيانات لتطابق التصميم الموجود في صفحة الأبحاث تماماً
    const formattedPapers = data.results.map((paper: any) => ({
      title: paper.title,
      year: paper.publication_year || new Date().getFullYear(),
      openAccessPdf: {
        url: paper.open_access?.oa_url || paper.primary_location?.landing_page_url || paper.id
      }
    }));

    return NextResponse.json(formattedPapers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch papers' }, { status: 500 });
  }
}
