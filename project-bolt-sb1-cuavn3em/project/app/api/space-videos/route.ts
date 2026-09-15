import { NextResponse } from 'next/server';

// إعادة التحقق كل 6 ساعات لتوفير حصة الـ API اليومية
export const revalidate = 21600;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const NASA_CHANNEL_ID = 'UCLA_DiR1FfKNvjuUpBHmylQ'; // القناة الرسمية لناسا

// قوائم احتياطية ثابتة - تُستخدم فقط عند فشل الاتصال أو نفاد الحصة
const FALLBACK_EARTH = ['awQzjn72bI0'];
const FALLBACK_DEEP_SPACE = ['Un5SEJ8MyPc', '17jymDn0W6U', 'rQcRNzeX40M', 'W1AEEB8o5j0'];

async function searchYoutube(params: Record<string, string>) {
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set('key', YOUTUBE_API_KEY as string);
  const res = await fetch(url.toString(), { next: { revalidate: 21600 } });
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  return res.json();
}

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ earth: FALLBACK_EARTH, deepSpace: FALLBACK_DEEP_SPACE, source: 'fallback-no-key' });
  }

  try {
    // بث حي من ناسا يعرض الأرض من المحطة
    const earthLive = await searchYoutube({
      part: 'snippet',
      channelId: NASA_CHANNEL_ID,
      eventType: 'live',
      type: 'video',
      q: 'ISS live earth view',
      maxResults: '5',
      safeSearch: 'strict',
    });

    const earthIds = (earthLive.items || [])
      .map((item: any) => item.id?.videoId)
      .filter(Boolean);

    // فيديوهات حديثة عن السدم والمجرات والفضاء العميق
    const deepSpace = await searchYoutube({
      part: 'snippet',
      type: 'video',
      q: 'deep space nebula galaxy telescope 4K',
      videoCategoryId: '28',
      order: 'date',
      publishedAfter: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
      maxResults: '10',
      safeSearch: 'strict',
    });

    const deepSpaceIds = (deepSpace.items || [])
      .map((item: any) => item.id?.videoId)
      .filter(Boolean);

    return NextResponse.json({
      earth: earthIds.length > 0 ? earthIds : FALLBACK_EARTH,
      deepSpace: deepSpaceIds.length > 0 ? deepSpaceIds : FALLBACK_DEEP_SPACE,
      source: 'youtube-api',
    });
  } catch (error) {
    console.error('YouTube API fetch failed:', error);
    return NextResponse.json({ earth: FALLBACK_EARTH, deepSpace: FALLBACK_DEEP_SPACE, source: 'fallback-error' });
  }
}
