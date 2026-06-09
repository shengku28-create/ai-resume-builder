import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PLAN_FEATURES } from '@/lib/types';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: (session.user as any).id as string },
    orderBy: { updatedAt: 'desc' },
    include: {
      sections: true,
    },
  });

  return NextResponse.json({ resumes });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
  });

  const features = PLAN_FEATURES[(user?.plan || 'FREE') as any];
  const resumeCount = await prisma.resume.count({
    where: { userId: (session.user as any).id },
  });

  if (features.maxResumes !== -1 && resumeCount >= features.maxResumes) {
    return NextResponse.json(
      { error: `免费套餐最多创建${features.maxResumes}份简历，请升级到专业版获取更多额度`, plan: user?.plan },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { title, template } = body;

  const resume = await prisma.resume.create({
    data: {
      userId: (session.user as any).id,
      title: title || '未命名简历',
      template: template || 'modern',
    },
    include: { sections: true },
  });

  return NextResponse.json({ resume });
}
