import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const downloadUrl = searchParams.get('url');

    if (!downloadUrl) {
      return NextResponse.json(
        { error: 'Missing URL parameter' },
        { status: 400 }
      );
    }

    // Fetch the remote file
    const response = await fetch(downloadUrl);

    if (!response.ok) {
        return NextResponse.json(
            { error: 'Failed to fetch the file from remote server' },
            { status: response.status }
        );
    }

    // Extract headers
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentDisposition = `attachment; filename="download-${Date.now()}.${contentType.includes('video') ? 'mp4' : 'jpg'}"`;

    // Stream the body right back to the client
    return new NextResponse(response.body, {
        headers: {
            'Content-Type': contentType,
            'Content-Disposition': contentDisposition,
            'Access-Control-Allow-Origin': '*'
        },
    });

  } catch (error: any) {
    console.error('Proxy Download Error:', error.message);
    return NextResponse.json(
      { error: 'Internal server error while bypassing CORS' },
      { status: 500 }
    );
  }
}
