import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import { prisma } from '@/lib/prisma';

// PayPal callback - processes payment after user approves on PayPal
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get('paymentId');
  const payerId = searchParams.get('PayerID');
  const userId = searchParams.get('userId');
  const plan = searchParams.get('plan') || 'PRO';

  if (!paymentId || !payerId || !userId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing?error=invalid_request`);
  }

  try {
    const paypalClient = getPayPalClient();
    
    // Execute the payment
    const request = new paypal.payments.PaymentExecutionRequest(paymentId);
    request.requestBody({ payer_id: payerId });
    const response = await paypalClient.execute(request);

    // Check payment status
    const state = response.result.intent?.toUpperCase() || response.result.state;
    const paymentState = response.result.status;
    
    if (paymentState !== 'APPROVED' && paymentState !== 'COMPLETED') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing?error=payment_failed`);
    }

    // Get payment details for invoice
    const purchaseUnit = response.result.purchase_units?.[0];
    const amount = purchaseUnit?.payments?.captures?.[0]?.amount;
    const transactionId = response.result.id;

    // Update user plan
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: plan as 'PRO' | 'ENTERPRISE',
        planExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    // Store invoice
    await prisma.invoice.create({
      data: {
        userId: userId,
        stripeInvoiceId: transactionId,
        amount: parseFloat(amount?.value || '0'),
        currency: amount?.currency || 'USD',
        status: paymentState,
        planType: plan,
      },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true`);
  } catch (error) {
    console.error('PayPal execute error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing?error=execution_failed`);
  }
}

function getPayPalClient() {
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
  const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  return new paypal.core.PayPalHttpClient(environment);
}
