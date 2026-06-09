import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const body = await req.json();
  const { priceId } = body;

  if (!priceId) {
    return NextResponse.json(
      { error: '缺少价格ID' },
      { status: 400 }
    );
  }

  try {
    const sessionResult = await stripe.checkout.sessions.create({
      customer_email: session.user.email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json({ url: sessionResult.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: '支付创建失败' },
      { status: 500 }
    );
  }
}
