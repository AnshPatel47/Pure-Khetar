import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { PRODUCT_CACHE_TAG } from '@/services/product.service';

export async function POST(request: Request) {
  const session = await requireAdmin(); if (!session) return NextResponse.json({error:'Unauthorized'}, {status:401});
  const data = await request.json();
  const slug = String(data.slug).toLowerCase().trim().replace(/[^a-z0-9]+/g,'-');
  if (!data.name || !data.categoryId || !slug) return NextResponse.json({error:'Missing product fields'}, {status:400});
  const generated = `/api/generated-product-image?name=${encodeURIComponent(String(data.name))}`;
  const product = await prisma.product.create({data:{name:String(data.name),slug,description:String(data.description??`Fresh ${String(data.name).toLowerCase()} from Pure Khetar farms.`),price:Number(data.price),stock:Number(data.stock??0),categoryId:String(data.categoryId),available:data.available!==false,comingSoon:Boolean(data.comingSoon),images:Array.isArray(data.images)&&data.images.length?data.images:[generated],imagePrompt:`Fresh ${String(data.name)} in a natural farm setting with Pure Khetar branding`}});
  await prisma.adminAuditLog.create({data:{actorId:session.user.id,action:'PRODUCT_CREATED',entity:'Product',entityId:product.id,metadata:{name:product.name}}});
  revalidateTag(PRODUCT_CACHE_TAG);
  return NextResponse.json(product,{status:201});
}
