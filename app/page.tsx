'use client';

import Link from 'next/link';
import { useState } from 'react';

const pricingPlans = [
  {
    name: '免费',
    price: '$0',
    period: '/月',
    features: [
      '2份简历额度',
      '5个模块限制',
      '3次AI优化',
      'Modern模板',
      'PDF导出',
    ],
    cta: '免费注册',
    ctaLink: '/register',
    highlighted: false,
  },
  {
    name: '专业版',
    price: '$9',
    period: '/月',
    features: [
      '10份简历额度',
      '8个模块限制',
      '50次AI优化',
      '3种模板',
      'PDF导出',
      '求职信生成',
      '优先支持',
    ],
    cta: '升级到专业版',
    ctaLink: '/pricing',
    highlighted: true,
  },
  {
    name: '企业版',
    price: '$29',
    period: '/月',
    features: [
      '无限简历',
      '无限模块',
      '无限AI优化',
      '4种模板(含创意)',
      'PDF导出',
      '求职信生成',
      '优先技术支持',
    ],
    cta: '选择企业版',
    ctaLink: '/pricing',
    highlighted: false,
  },
];

const features = [
  {
    icon: '🤖',
    title: 'AI智能优化',
    desc: '基于DeepSeek大模型，自动优化你的简历内容，使其更符合目标职位的要求。',
  },
  {
    icon: '📄',
    title: '多种专业模板',
    desc: '提供Modern、Professional、Minimal、Creative四种模板，满足不同行业需求。',
    isPro: true,
  },
  {
    icon: '⚡',
    title: '快速生成',
    desc: '只需填写基本信息，AI自动为你生成专业的职业概述和经历描述。',
  },
  {
    icon: '📥',
    title: '一键导出PDF',
    desc: '生成的简历可以直接导出为PDF格式，立即投递给心仪的公司。',
  },
  {
    icon: '✉️',
    title: '求职信生成',
    desc: '根据你的简历和目标职位，自动生成专业的求职信。',
    isPro: true,
  },
  {
    icon: '🔒',
    title: '数据安全',
    desc: '所有数据存储在安全的数据库中，你的个人信息得到充分保护。',
  },
];

const testimonials = [
  {
    name: '张明',
    role: '软件工程师',
    text: 'AI Resume Builder帮我在30分钟内生成了一份专业简历，面试邀请数量增加了三倍！',
  },
  {
    name: '李婷',
    role: '产品经理',
    text: 'AI优化功能非常强大，自动把我的经历描述改得更专业、更有说服力。强烈推荐！',
  },
  {
    name: '王强',
    role: '数据分析师',
    text: '模板设计精美，导出效果出色。使用专业版后，简历质量大幅提升。',
  },
];

export default function HomePage() {
  const [email, setEmail] = useState('');

  const handleWaitlist = () => {
    if (email) {
      alert('感谢加入等待列表！我们会尽快通知您。');
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">AI</span> Resume Builder
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              功能
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              定价
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              评价
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-foreground transition-colors">
              登录
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              免费开始
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm mb-8">
            ✨ AI驱动 · 专业模板 · 一键导出
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            用AI打造你的
            <span className="text-primary"> 专业简历</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            无需设计技能，无需写作经验。AI自动优化内容，提供多种精美模板，
            30分钟创建一份令HR眼前一亮的专业简历。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-base font-semibold text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              免费创建简历 →
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-base font-semibold border-2 hover:bg-muted transition-all"
            >
              了解更多
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">✓ 无需信用卡</span>
            <span className="flex items-center gap-1">✓ 免费版永久可用</span>
            <span className="flex items-center gap-1">✓ 随时升级</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">三步创建完美简历</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', icon: '📝', title: '填写信息', desc: '输入你的个人信息、工作经历、教育背景等' },
              { step: '2', icon: '🤖', title: 'AI优化', desc: 'AI自动优化内容，生成专业的职业概述' },
              { step: '3', icon: '📥', title: '导出简历', desc: '选择模板，一键导出为PDF，立即投递' },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 rounded-2xl border bg-card">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-primary font-bold text-sm mb-2">步骤 {item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">强大功能，助你脱颖而出</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            从内容生成到精美排版，AI Resume Builder提供了一站式简历制作解决方案
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl">{feature.icon}</span>
                <div className="flex items-center gap-2 mt-3 mb-2">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  {feature.isPro && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">PRO</span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">简单透明的定价</h2>
          <p className="text-muted-foreground text-center mb-16">选择适合你的套餐，免费版即可开始使用</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 ${
                  plan.highlighted
                    ? 'border-primary shadow-xl scale-105 bg-card'
                    : 'border-border bg-card'
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    最受欢迎
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="text-green-500 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaLink}
                  className={`block w-full text-center h-12 rounded-xl font-medium transition-all ${
                    plan.highlighted
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'border-2 border-border hover:bg-muted'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">用户评价</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-card">
                <div className="text-yellow-400 mb-4">★★★★★</div>
                <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">准备好创建你的完美简历了吗？</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            加入数千名已经通过AI Resume Builder找到理想工作的求职者
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center h-14 px-10 rounded-xl text-lg font-semibold text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            免费开始使用 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-lg mb-3">
                <span className="text-primary">AI</span> Resume Builder
              </div>
              <p className="text-sm text-muted-foreground">
                用AI技术帮助你打造专业简历，助力职业发展。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">产品</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">功能</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">定价</Link></li>
                <li><Link href="/register" className="hover:text-foreground">开始使用</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">支持</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">帮助中心</Link></li>
                <li><Link href="#" className="hover:text-foreground">联系我们</Link></li>
                <li><Link href="#" className="hover:text-foreground">常见问题</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">法律</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">隐私政策</Link></li>
                <li><Link href="#" className="hover:text-foreground">服务条款</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
