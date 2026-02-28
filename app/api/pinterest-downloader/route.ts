import { NextResponse } from 'next/server';
import { pinterest } from 'btch-downloader';

// Try multiple scraping methods to get the video or image

async function getFinalUrl(url: string, depth = 0): Promise<string> {
  if (depth > 5) return url;
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location');
      if (loc) {
         let nextUrl = loc;
         if (!loc.startsWith('http')) {
             const parsed = new URL(url);
             nextUrl = `${parsed.protocol}//${parsed.host}${loc}`;
         }
         return getFinalUrl(nextUrl, depth + 1);
      }
    }
    return url;
  } catch (e) {
    return url;
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || (!url.includes('pinterest.com') && !url.includes('pin.it'))) {
      return NextResponse.json(
        { error: 'Please provide a valid Pinterest URL' },
        { status: 400 }
      );
    }

    let mediaUrl = '';
    let type: 'video' | 'image' = 'image';
    let thumbnail = '';

    // Strategy 1: Direct HTML Scraping (Highly reliable for Pinterest Videos using LD+JSON)
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const htmlRes = await fetch(url.includes('pin.it') ? await getFinalUrl(url) : url, {
             headers: {
                 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
                 'Accept': 'text/html,application/xhtml+xml',
             },
             signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (htmlRes.ok) {
            const html = await htmlRes.text();
            
            // Try extracting from ld+json
            const ldJsonRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
            let match;
            while ((match = ldJsonRegex.exec(html)) !== null) {
              try {
                const ldDataArray = JSON.parse(match[1]);
                const checkLdData = (ldData: any) => {
                   if (ldData.video && ldData.video.contentUrl) {
                     type = 'video';
                     mediaUrl = ldData.video.contentUrl;
                     thumbnail = ldData.video.thumbnailUrl || '';
                   } else if (!mediaUrl && ldData.image) {
                     type = 'image';
                     mediaUrl = typeof ldData.image === 'string' ? ldData.image : (ldData.image.url || '');
                     thumbnail = mediaUrl;
                   }
                }
                if (Array.isArray(ldDataArray)) {
                    ldDataArray.forEach(checkLdData);
                } else {
                    checkLdData(ldDataArray);
                }
              } catch (e) {
                // ignore
              }
            }
            
            // Fallback to meta tags if ld+json didn't have video
            if (!mediaUrl || type === 'image' || mediaUrl.includes('.m3u8')) {
              const videoRegex = /"((?:https?:)?\/\/[^"]*\.mp4[^"]*)"/gi;
              const matches = Array.from(html.matchAll(videoRegex));
              const mp4Urls = [];
              for (const m of matches) {
                if (m[1].includes('v.pinimg.com') || m[1].includes('video')) {
                  mp4Urls.push(m[1].replace(/\\u002F/g, '/'));
                }
              }
              if (mp4Urls.length > 0) {
                 type = 'video';
                 // Sort by resolution if possible, otherwise pick the last one which is usually highest
                 mediaUrl = mp4Urls.find(u => u.includes('1080p') || u.includes('V_1080P')) || 
                            mp4Urls.find(u => u.includes('720p') || u.includes('V_720P')) || 
                            mp4Urls[mp4Urls.length - 1];
              }
            }
        }
    } catch (e) {
        console.warn("Direct HTML Scraping failed or timed out", e);
    }

    // Strategy 2: btch-downloader fallback (Good for images / backup)
    if (!mediaUrl) {
      try {
        const res = await pinterest(url);
        const data = res as any; 
        if (data && data.status && data.result) {
          if (data.result.result) {
            const item = data.result.result;
            if (item.is_video || item.video_url || item.videos) {
              mediaUrl = item.video_url || (item.videos && (Object.values(item.videos)[0] as any)?.url) || '';
              type = 'video';
              thumbnail = item.image || (item.videos && (Object.values(item.videos)[0] as any)?.thumbnail) || '';
            } else {
              mediaUrl = item.image || (item.images && item.images.orig && item.images.orig.url) || '';
              type = 'image';
              thumbnail = mediaUrl;
            }
          } 
          else if (Array.isArray(data.result)) {
            const pin = data.result[0];
            if (pin) {
              mediaUrl = pin.video_url || pin.image_url || '';
              type = pin.is_video ? 'video' : 'image';
              thumbnail = pin.image_url || '';
            }
          }
          if (mediaUrl.includes('.m3u8')) {
              mediaUrl = mediaUrl.replace('.m3u8', '.mp4'); // Sometimes Pinterest urls can be simply switched
          }
        }
      } catch (e) {
        console.warn("btch-downloader failed for", url);
      }
    }

    if (mediaUrl) {
        return NextResponse.json({
          url: mediaUrl,
          type,
          thumbnail
        });
    }

    return NextResponse.json(
      { error: 'Failed to extract media. The pin might be private, or Pinterest blocked the scraper.' },
      { status: 500 }
    );

  } catch (error: any) {
    console.error('Open Source Pinterest Downloader Error:', error.message);
    
    return NextResponse.json(
      { error: 'Failed to process the URL. Please make sure the pin is public, or try again later.' },
      { status: 500 }
    );
  }
}

