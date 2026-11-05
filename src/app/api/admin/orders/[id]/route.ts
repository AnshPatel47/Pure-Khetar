import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
export async function PATCH(request:Request,{params}:{params:{id:string}}){const session=await requireAdmin();if(!session)return NextResponse.json({error:'Unauthorized'},{status:401});const {status}=await request.json();const data:Record<string,unknown>={status};if(status==='APPROVED')data.approvedAt=new Date();if(status==='REJECTED')data.rejectedAt=new Date();const order=await prisma.order.update({where:{id:params.id},data});await prisma.adminAuditLog.create({data:{actorId:session.user.id,action:'ORDER_STATUS_UPDATED',entity:'Order',entityId:order.id,metadata:{status}}});return NextResponse.json(order)}
