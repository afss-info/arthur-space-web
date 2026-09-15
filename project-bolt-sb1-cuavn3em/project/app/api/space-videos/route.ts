import { NextResponse } from 'next/server';

export const revalidate = 21600; // 6 ساعات

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const NASA_CHANNEL_ID = 'UCLA_DiR1FfKNvjuUpBHmylQ';

const FALLBACK_EARTH = ['awQzjn72bI0'];
const FALLBACK_DEEP_SPACE = ['Un5SEJ8MyPc', '17jymDn0W6U', 'rQcRNzeX40M', 'W1AEEB8o5j0'];

async function searchYoutube(params: Record<string, string>) {
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set('key', YOUTUBE_API_KEY as string);
  const res = await fetch(url.toString(), { next: { revalidate: 21600 } });
  if (!res.ok) throw new Error(`YouTube search error: ${res.status}`);
  return res.json();
}

async function filterEmbeddableVideos(videoIds: string[]): Promise<string[]> {
  if (videoIds.length === 0) return [];
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('part', 'status');
  url.searchParams.set('id', videoIds.join(','));
  url.searchParams.set('key', YOUTUBE_API_KEY as string);

  const res = await fetch(url.toString(), { next: { revalidate: 21600 } });
  if (!res.ok) return [];
  const data = await res.json();

  return (data.items || [])
    .filter((item: any) => item.status?.embeddable === true && item.status?.privacyStatus === 'public')
    .map((item: any) => item.id);
}

async function findLiveEarthVideos(): Promise<string[]> {
  // المحاولة 1: بث حي من قناة ناسا الرسمية تحديدًا
  const attempt1 = await searchYoutube({
    part: 'snippet',
    channelId: NASA_CHANNEL_ID,
    eventType: 'live',
    type: 'video',
    q: 'ISS live earth view',
    maxResults: '5',
    safeSearch: 'strict',
  });
  let ids = await filterEmbeddableVideos(
    (attempt1.items || []).map((i: any) => i.id?.videoId).filter(Boolean)
  );
  if (ids.length > 0) return ids;

  // المحاولة 2: بث حي بدون تقييد بقناة معينة (أوسع نطاقًا)
  const attempt2 = await searchYoutube({
    part: 'snippet',
    eventType: 'live',
    type: 'video',
    q: 'ISS International Space Station live earth camera 24/7',
    maxResults: '8',
    safeSearch: 'strict',
  });
  ids = await filterEmbeddableVideos(
    (attempt2.items || []).map((i: any) => i.id?.videoId).filter(Boolean)
  );
  if (ids.length > 0) return ids;

  // المحاولة 3: نفس المعرّف الاحتياطي، لكن بعد التأكد من قابليته للتضمين فعليًا
  const fallbackChecked = await filterEmbeddableVideos(FALLBACK_EARTH);
  return fallbackChecked; // قد تكون فارغة، والدالة المستدعية ستتعامل مع ذلك
}

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ earth: FALLBACK_EARTH, deepSpace: FALLBACK_DEEP_SPACE, source: 'fallback-no-key' });
  }

  try {
    const earthIds = await findLiveEarthVideos();

    const deepSpace = await searchYoutube({
      part: 'snippet',
      type: 'video',
      q: 'deep space nebula galaxy telescope 4K',
      videoCategoryId: '28',
      order: 'date',
      publishedAfter: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180).toISOString(),
      maxResults: '15',
      safeSearch: 'strict',
    });
    const rawDeepSpaceIds = (deepSpace.items || []).map((item: any) => item.id?.videoId).filter(Boolean);
    let deepSpaceIds = await filterEmbeddableVideos(rawDeepSpaceIds);
    if (deepSpaceIds.length === 0) {
      deepSpaceIds = await filterEmbeddableVideos(FALLBACK_DEEP_SPACE);
    }

    return NextResponse.json({
      earth: earthIds.length > 0 ? earthIds : FALLBACK_EARTH, // حل أخير فقط إذا فشل كل شيء حتى الفحص
      deepSpace: deepSpaceIds.length > 0 ? deepSpaceIds : FALLBACK_DEEP_SPACE,
      source: 'youtube-api',
    });
  } catch (error) {
    console.error('YouTube API fetch failed:', error);
    return NextResponse.json({ earth: FALLBACK_EARTH, deepSpace: FALLBACK_DEEP_SPACE, source: 'fallback-error' });
  }
}
