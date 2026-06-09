'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Types
type PlanKey = 'FREE' | 'PRO' | 'ENTERPRISE';

interface Plan {
  name: string;
  price: number;
  priceId: PlanKey;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
  limitResumes: string;
  limitAIOptimizations: string;
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: 0,
    priceId: 'FREE',
    period: 'forever',
    features: [
      '2 resumes',
      '5 resume modules',
      '3 AI optimizations',
      'Modern template',
      'PDF export',
      'No credit card required',
    ],
    cta: 'Start for Free',
    popular: false,
    limitResumes: '2',
    limitAIOptimizations: '3',
  },
  {
    name: 'Pro',
    price: 19,
    priceId: 'PRO',
    period: '/month',
    features: [
      '10 resumes',
      'Unlimited resume modules',
      '50 AI optimizations/month',
      '3 premium templates',
      'PDF export',
      'Cover letter generation',
      'Priority email support',
      '40% cheaper than competitors',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    limitResumes: '10',
    limitAIOptimizations: '50/month',
  },
  {
    name: 'Enterprise',
    price: 49,
    priceId: 'ENTERPRISE',
    period: '/month',
    features: [
      'Unlimited resumes',
      'Unlimited resume modules',
      'Unlimited AI optimizations',
      '4 premium templates',
      'PDF export',
      'Cover letter generation',
      'Custom branding',
      'Priority phone support',
      'API access',
    ],
    cta: 'Choose Enterprise',
    popular: false,
    limitResumes: 'Unlimited',
    limitAIOptimizations: 'Unlimited',
  },
];

export default function PricingPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check user session
    fetch('/api/user')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  const handleUpgrade = async (plan: Plan) => {
    if (!user) {
      router.push('/register');
      return;
    }

    if (plan.price === 0) {
      router.push('/register');
      return;
    }

    setLoading(true);
    setSelectedPlan(plan.priceId);
    
    try {
      const res = await fetch('/api/paypal/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: plan.priceId }),
      });

      if (!res.ok) throw new Error('Failed to create PayPal order');

      const data = await res.json();
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        alert('支付初始化失败，请重试');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('支付服务暂时不可用，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent">
      {/* Nav */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-primary">AI</span> Resume Builder
          </Link>
          <div className="flex gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium">仪表板</Link>
                <span className="text-sm text-muted-foreground">{user.user?.name || user.user?.email}</span>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium">登录</Link>
                <Link href="/register" className="text-sm bg-primary text-white px-4 py-2 rounded-lg">注册</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            选择适合你的方案
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            免费版即可体验全部核心功能。升级到专业版或企业版，解锁 AI 驱动的简历优化和更多模板。
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/></svg>
            <span className="text-sm">PayPal 安全支付 · 随时取消</span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.priceId}
              className={`rounded-2xl border p-6 md:p-8 transition-all ${
                plan.popular
                  ? 'border-primary shadow-2xl scale-105 bg-card ring-2 ring-primary/20'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="inline-block bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  ⭐ 最受欢迎
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-extrabold">${plan.price}</span>
                {plan.price > 0 && <span className="text-muted-foreground"> {plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade(plan)}
                disabled={loading}
                className={`w-full h-12 rounded-xl font-medium transition-all ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25'
                    : plan.price === 0
                    ? 'border-2 border-border hover:bg-muted text-foreground'
                    : 'bg-primary text-white hover:bg-primary/90'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? '处理中...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span className="text-sm">全球支付</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
            <span className="text-sm">PayPal 安全支付</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <span className="text-sm">随时取消</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
          <div className="space-y-3">
            {[
              { q: '免费版有什么限制？', a: '免费版可以创建2份简历，使用5个模块，进行3次AI优化。完全免费，无需信用卡。' },
              { q: '如何支付？', a: '我们使用 PayPal 收款，支持信用卡、借记卡、PayPal 余额等多种支付方式。安全、快捷、无隐藏费用。' },
              { q: '可以随时取消吗？', a: '当然。您可以在任何时间取消订阅，已付费的周期内功能正常使用。无需理由。' },
              { q: '可以开发票吗？', a: '可以。所有 PayPal 支付都会自动开具电子发票，在账户页面查看和管理。' },
              { q: '支持哪些语言？', a: 'AI Resume Builder 支持中文和英文简历，以及 AI 智能优化建议。' },
            ].map((faq, i) => (
              <details key={i} className="border rounded-xl transition-all">
                <summary className="p-5 cursor-pointer font-medium">{faq.q}</summary>
                <div className="px-5 pb-5 text-muted-foreground">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2026 AI Resume Builder. Powered by AI.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="opacity-50">PayPal Secure Payment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
