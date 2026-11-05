import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireAdmin } from '@/lib/admin';

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true });

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof Blob)) return NextResponse.json({ error: 'Image file is required.' }, { status: 400 });
  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Only image files are accepted.' }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await new Promise<{ secure_url?: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'pure-khetar/products', resource_type: 'image', transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }] }, (error, result) => error ? reject(error) : resolve(result ?? {})).end(buffer);
  });
  if (!uploaded.secure_url) return NextResponse.json({ error: 'Upload failed.' }, { status: 502 });
  return NextResponse.json({ url: uploaded.secure_url });
}
