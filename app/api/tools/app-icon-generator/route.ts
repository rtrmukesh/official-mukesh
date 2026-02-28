import { NextRequest, NextResponse } from 'next/server';
import { buildZipArchive, GenerationParams } from '@/lib/zipBuilder';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const platformsStr = formData.get('platforms') as string;
    const paddingStr = formData.get('padding') as string;
    const backgroundColor = formData.get('backgroundColor') as string || 'transparent';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded. Please upload a PNG or JPG.' }, { status: 400 });
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PNG or JPG are allowed.' }, { status: 400 });
    }

    let platforms = ['iOS', 'Android', 'Web'];
    if (platformsStr) {
      try {
        platforms = JSON.parse(platformsStr);
      } catch (e) {
        // Fallback to default
      }
    }

    const padding = paddingStr === 'true';

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const params: GenerationParams = {
      platforms,
      padding,
      backgroundColor
    };

    const zipBuffer = await buildZipArchive(buffer, params);

    // Provide the ZIP file directly for efficiency instead of huge Base64 strings.
    return NextResponse.json({
        zipBase64: zipBuffer.toString('base64') 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error in App Icon Generator API:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred while generating app icons.' },
      { status: 500 }
    );
  }
}
