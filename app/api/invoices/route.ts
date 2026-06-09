import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: (session.user as any).id as string },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ invoices });
}
