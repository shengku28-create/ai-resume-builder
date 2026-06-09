'use client';

import Link from 'next/link';
import { useState } from 'react';

const plans = [
  {
    name: '免费',
    price: 0,
    features: [
      { text: '2份简历', included: true },
      { text: '5个模块', included: true },
      { text: '3次AI优化', included: true },
      { text: 'Modern模板', included: true },
      { text: 'PDF导出', included: true },
      { text: '求职信生成', included: false },
      { text: '优先支持', included: false },
    ],
    cta: '免费使用',
    ctaLink: '/register',
    popular: false,
  },
  {
    name: '专业版',
    price: 9,
    features: [
      { text: '10份简历', included: true },
      { text: '8个模块', included: true },
      { text: '50次AI优化', included: true },
      { text: '3种模板', included: true },
      { text: 'PDF导出', included: true },
      { text: '求职信生成', included: true },
      { text: '优先支持', included: false },
    ],
    cta: '升级到专业版',
    ctaLink: '#',
    popular: true,
  },
  {
    name: '企业版',
    price: 29,
    features: [
      { text: '无限简历', included: true },
      { text: '无限模块', included: true },
      { text: '无限AI优化', included: true },
      { text: '4种模板', included: true },
      { text: 'PDF导出', included: true },
      { text: '求职信生成', included: true },
      { text: '优先支持', included: true },
    ],
    cta: '选择企业版',
    ctaLink: '#',
    popular: false,
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleUpgrade = async (planIndex: number) => {
    setSelectedPlan(planIndex);
    // In production, call checkout API
    alert(`升级到${plans[planIndex].name}功能即将上线，敬请期待！`);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent">
      {/* Nav */}
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            <span className="text-primary">AI</span> Resume Builder
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium">登录</Link>
            <Link href="/register" className="text-sm bg-primary text-white px-4 py-2 rounded-lg">注册</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">选择适合你的套餐</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            免费版即可开始使用，专业版和企业版解锁全部功能
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-primary shadow-xl scale-105 bg-card'
                  : 'border-border bg-card'
              }`}
            >
              {plan.popular && (
                <div className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  最受欢迎
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">${plan.price}</span>
                <span className="text-muted-foreground">/月</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-sm">
                    <span className={f.included ? 'text-green-500' : 'text-muted-foreground'}>
                      {f.included ? '✓' : '✗'}
                    </span>
                    <span className={!f.included ? 'line-through opacity-50' : ''}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade(i)}
                disabled={selectedPlan !== null}
                className={`w-full h-12 rounded-xl font-medium transition-all ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : plan.price === 0
                    ? 'border-2 border-border hover:bg-muted'
                    : 'bg-primary text-white hover:bg-primary/90'
                } disabled:opacity-50`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
          <div className="space-y-4">
            {[
              { q: '免费版有什么限制？', a: '免费版可以创建2份简历，使用5个模块，进行3次AI优化。适合偶尔使用的求职者。' },
              { q: '可以随时取消订阅吗？', a: '当然可以。你可以在任何时间取消订阅，已付费的周期内功能正常使用。' },
              { q: '支持哪些支付方式？', a: '我们支持信用卡（Visa/MasterCard/Amex）和PayPal支付。' },
              { q: '可以开发票吗？', a: '可以。所有支付都会自动开具电子发票，在账户页面查看。' },
            ].map((faq, i) => (
              <details key={i} className="border rounded-xl">
                <summary className="p-5 cursor-pointer font-medium">{faq.q}</summary>
                <div className="px-5 pb-5 text-muted-foreground">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
