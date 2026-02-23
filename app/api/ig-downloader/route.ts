import { NextResponse } from 'next/server';
// @ts-ignore
import { instagramGetUrl } from 'instagram-url-direct';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || !url.includes('instagram.com')) {
      return NextResponse.json(
        { error: 'Please provide a valid Instagram URL' },
        { status: 400 }
      );
    }

    const result = await instagramGetUrl(url);
    if (result && result.url_list && result.url_list.length > 0) {
      const mediaUrl = result.url_list[0];
      
      return NextResponse.json({
        url: mediaUrl,
        type: url.includes('/reel/') || url.includes('/video/') || mediaUrl.includes('.mp4') ? 'video' : 'image',
        thumbnail: '' 
      });
    }

    return NextResponse.json(
      { error: 'Failed to extract media. The post might be private, or Instagram blocked the scraper.' },
      { status: 500 }
    );

  } catch (error: any) {
    console.error('Open Source Instagram Downloader Error:', error.message);
    
    return NextResponse.json(
      { error: 'Failed to process the URL. Please make sure the post is public, or try again later.' },
      { status: 500 }
    );
  }
}
