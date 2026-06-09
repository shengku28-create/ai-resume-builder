import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: params.id,
      userId: (session.user as any).id,
    },
    include: { sections: { orderBy: { order: 'asc' } } },
  });

  if (!resume) {
    return NextResponse.json({ error: '简历不存在' }, { status: 404 });
  }

  return NextResponse.json({ resume });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const body = await req.json();
  const { title, template } = body;

  const resume = await prisma.resume.update({
    where: {
      id: params.id,
      userId: (session.user as any).id,
    },
    data: {
      ...(title && { title }),
      ...(template && { template }),
    },
  });

  return NextResponse.json({ resume });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  await prisma.resume.delete({
    where: {
      id: params.id,
      userId: (session.user as any).id,
    },
  });

  return NextResponse.json({ success: true });
}
