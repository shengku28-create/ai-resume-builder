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
          // Update user plan based on the price
          const { PrismaClient } = await import('@prisma/client');
          const prisma = new PrismaClient();

          // Determine plan based on price
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

          await prisma.$disconnect();
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();

        // Store invoice
        await prisma.invoice.create({
          data: {
            userId: invoice.customer?.toString() || '',
            stripeInvoiceId: invoice.id,
            amount: invoice.amount_paid,
            currency: invoice.currency || 'usd',
            status: invoice.status,
          },
        });

        // Extend plan expiration
        const lineItems = await stripe.invoices.listLineItems(invoice.id);
        const priceId = lineItems.data[0]?.price?.id;
        let plan: 'PRO' | 'ENTERPRISE' = 'PRO';
        if (
          priceId === process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID
        ) {
          plan = 'ENTERPRISE';
        }

        await prisma.user.update({
          where: { id: invoice.customer?.toString() || '' },
          data: {
            plan,
            planExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });

        await prisma.$disconnect();
        break;
      }

      case 'invoice.payment_failed': {
        // Handle failed payment
        console.log('Payment failed for invoice:', event.data.object.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook处理失败' },
      { status: 500 }
    );
  }
}
