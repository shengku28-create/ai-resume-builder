import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { optimizeSummary, generateSummary } from '@/lib/ai/deepseek';
import { PLAN_FEATURES } from '@/lib/types';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
  });

  const features = PLAN_FEATURES[(user?.plan || 'FREE') as 'FREE'];
  if (features.aiOptimizations !== -1 && user?.plan === 'FREE') {
    // For now, allow limited free usage
  }

  const body = await req.json();
  const { action, data } = body;

  try {
    let result;

    switch (action) {
      case 'optimize-summary':
        result = {
          content: await optimizeSummary(data.summary, data.jobDescription),
        };
        break;

      case 'generate-summary':
        result = {
          content: await generateSummary({
            position: data.position || '',
            experience: data.experience || '',
            skills: data.skills || '',
          }),
        };
        break;

      default:
        return NextResponse.json(
          { error: '未知的AI操作类型' },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'AI服务暂时不可用，请稍后重试' },
      { status: 500 }
    );
  }
}
