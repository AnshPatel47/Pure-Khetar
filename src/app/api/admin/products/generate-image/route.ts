import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireAdmin } from '@/lib/admin';

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true });
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name } = await request.json() as { name?: string };
  const productName = String(name ?? '').trim();
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!productName) return NextResponse.json({ error: 'Product name is required.' }, { status: 400 });
  if (!apiKey) return NextResponse.json({ error: 'Gemini is not configured.' }, { status: 503 });

  const prompt = `Professional premium square product photograph of fresh ${productName}, natural farm setting, soft daylight, realistic texture, clean background, no text except a small bottom-right Pure Khetar logo badge.`;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio: '1:1' } }),
  });
  if (!response.ok) return NextResponse.json({ error: 'AI image generation failed.' }, { status: 502 });
  const data = await response.json() as { predictions?: Array<{ bytesBase64Encoded?: string }> };
  const base64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!base64) return NextResponse.json({ error: 'No generated image returned.' }, { status: 502 });
  const uploaded = await cloudinary.uploader.upload(`data:image/png;base64,${base64}`, { folder: 'pure-khetar/products', public_id: `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`, transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }] });
  return NextResponse.json({ url: uploaded.secure_url });
}
