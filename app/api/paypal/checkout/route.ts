import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import paypal from '@paypal/checkout-server-sdk';

function getPayPalClient() {
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
  const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  return new paypal.core.PayPalHttpClient(environment);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { priceId } = await req.json();
    
    const plans: Record<string, { name: string; amount: string }> = {
      'PRO': { name: 'AI Resume Pro', amount: '9.99' },
      'ENTERPRISE': { name: 'AI Resume Enterprise', amount: '29.99' },
    };
    
    const planData = plans[priceId || 'PRO'];
    if (!planData) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const paypalClient = getPayPalClient();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const userId = (session.user as any).id as string;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return-representation=true');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: priceId || 'PRO',
        amount: {
          value: planData.amount,
          currency: 'USD',
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: planData.amount,
            },
          },
        },
        items: [{
          name: planData.name,
          unit_amount: {
            currency_code: 'USD',
            value: planData.amount,
          },
          quantity: '1',
        }],
      }],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            return_url: `${baseUrl}/api/paypal/callback?userId=${userId}&plan=${priceId || 'PRO'}`,
            cancel_url: `${baseUrl}/pricing`,
          },
        },
      },
    });

    const response = await paypalClient.execute(request);
    
    const approvalUrl = response.result.links?.find((l: any) => l.rel === 'approve')?.href;
    
    if (!approvalUrl) {
      return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 });
    }

    return NextResponse.json({ approvalUrl });
  } catch (error) {
    console.error('PayPal error:', error);
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 500 });
  }
}
