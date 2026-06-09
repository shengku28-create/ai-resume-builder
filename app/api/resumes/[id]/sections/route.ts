import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { type SectionType } from '@/lib/types';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const body = await req.json();
  const { type, content, order } = body;

  // Check if section already exists
  const existing = await prisma.resumeSection.findUnique({
    where: {
      resumeId_type: {
        resumeId: params.id,
        type: type as SectionType,
      },
    },
  });

  if (existing) {
    const section = await prisma.resumeSection.update({
      where: { id: existing.id },
      data: { content, order: order ?? existing.order },
    });
    return NextResponse.json({ section });
  }

  const section = await prisma.resumeSection.create({
    data: {
      resumeId: params.id,
      type: type as SectionType,
      content,
      order: order ?? 0,
    },
  });

  // Update resume status
  await prisma.resume.update({
    where: { id: params.id },
    data: { status: 'OPTIMIZED' },
  });

  return NextResponse.json({ section });
}
