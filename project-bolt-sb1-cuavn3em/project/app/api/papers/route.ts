import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.semanticscholar.org/graph/v1/paper/search?query=astrophysics+space+exploration&limit=15&fields=title,url,abstract,year,authors,openAccessPdf', {
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error('Failed to fetch research papers');

    const data = await response.json();
    
    // فلترة وعرض أحدث 4 أوراق تمتلك PDF مجاني
    const freePapers = data.data
      .filter((paper: any) => paper.openAccessPdf !== null)
      .slice(0, 4);

    return NextResponse.json(freePapers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch papers' }, { status: 500 });
  }
}
