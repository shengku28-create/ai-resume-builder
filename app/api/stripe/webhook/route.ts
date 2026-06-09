import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature') || '';
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook签名验证失败' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        if (userId) {
          const { prisma } = await import('@/lib/prisma');

          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id
          );
          const priceId = lineItems.data[0]?.price?.id;

          let plan: 'PRO' | 'ENTERPRISE' = 'PRO';
          if (
            priceId === process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID
          ) {
            plan = 'ENTERPRISE';
          }

          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: plan,
              planExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            },
          });
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const { prisma } = await import('@/lib/prisma');

        // Store invoice
        const customerId = typeof invoice.customer === 'string' 
          ? invoice.customer 
          : (invoice.customer as any).id || '';
        await prisma.invoice.create({
          data: {
            userId: customerId,
            stripeInvoiceId: invoice.id,
            amount: invoice.amount_paid,
            currency: invoice.currency || 'usd',
            status: invoice.status,
            planType: 'PRO',
          },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
