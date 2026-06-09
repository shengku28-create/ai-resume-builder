import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PLAN_FEATURES, type PlanType } from '@/lib/types';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id as string },
    include: {
      resumes: { orderBy: { updatedAt: 'desc' }, take: 10 },
    },
  });

  if (!user) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  const features = PLAN_FEATURES[user.plan as PlanType];

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      plan: user.plan,
      planExpires: user.planExpires,
      features,
      resumeCount: user.resumes.length,
    },
  });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const body = await req.json();
  const { name, image } = body;

  const user = await prisma.user.update({
    where: { id: (session.user as any).id },
    data: {
      ...(name && { name }),
      ...(image && { image }),
    },
  });

  return NextResponse.json({ user });
}
