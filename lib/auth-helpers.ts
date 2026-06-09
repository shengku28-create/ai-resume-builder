import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { user: null, error: '未登录' };
  }
  return { user: session.user, error: null };
}

export function requireProPlan(userPlan: string) {
  if (userPlan === 'FREE') {
    return NextResponse.json(
      { error: '此功能需要专业版或企业版订阅', plan: 'FREE' },
      { status: 403 }
    );
  }
  return null;
}

export function requireEnterprisePlan(userPlan: string) {
  if (userPlan !== 'ENTERPRISE') {
    return NextResponse.json(
      { error: '此功能需要企业版订阅', plan: userPlan },
      { status: 403 }
    );
  }
  return null;
}
