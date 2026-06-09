'use client';

import Link from 'next/link';
import { useState } from 'react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    features: [
      '2 resumes',
      '5 resume modules',
      '3 AI optimizations',
      'Modern template',
      'PDF export',
    ],
    cta: 'Get Started Free',
    ctaLink: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    features: [
      '10 resumes',
      'Unlimited resume modules',
      '50 AI optimizations/month',
      '3 premium templates',
      'PDF export',
      'Cover letter generator',
      'Priority support',
      '40% cheaper than Resume.io/Zety',
    ],
    cta: 'Upgrade to Pro',
    ctaLink: '/pricing',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    features: [
      'Unlimited resumes',
      'Unlimited modules',
      'Unlimited AI optimizations',
      '4 premium templates',
      'PDF export',
      'Cover letter generator',
      'Custom branding',
      'Priority phone support',
      'API access',
    ],
    cta: 'Choose Enterprise',
    ctaLink: '/pricing',
    highlighted: false,
  },
];

const features = [
  {
    icon: '🤖',
    title: 'AI ATS Optimization',
    desc: 'Powered by DeepSeek large language models, automatically optimizes your resume content to match target job requirements.',
  },
  {
    icon: '📄',
    title: '10+ Professional Templates',
    desc: 'Choose from Modern, Professional, Minimal, Creative, and more templates tailored for every industry.',
    isPro: true,
  },
  {
    icon: '⚡',
    title: 'Fast Generation',
    desc: 'Just fill in your basic info — AI auto-generates professional summaries and experience descriptions.',
  },
  {
    icon: '📥',
    title: 'One-Click PDF Export',
    desc: 'Export your polished resume as a professional PDF instantly, ready to apply.',
  },
  {
    icon: '✉️',
    title: 'Cover Letter Generator',
    desc: 'Auto-generates tailored cover letters based on your resume and target positions.',
    isPro: true,
  },
  {
    icon: '🔒',
    title: 'Data Security',
    desc: 'All data is stored securely — your personal information is fully protected.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    text: 'AI Resume Builder helped me create a professional resume in just 30 minutes. My interview requests tripled within a week!',
  },
  {
    name: 'James Miller',
    role: 'Product Manager at Meta',
    text: 'The AI optimization is incredibly powerful. It transformed my experience descriptions to sound more professional and impactful. Highly recommend!',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Data Analyst at Amazon',
    text: 'Beautiful templates and excellent PDF output quality. After upgrading to Pro, my resume quality improved dramatically.',
  },
];

const faqItems = [
  {
    q: 'What does the Free plan include?',
    a: 'The Free plan lets you create 2 resumes, use 5 resume modules, and perform 3 AI optimizations. It\'s completely free — no credit card required.',
  },
  {
    q: 'How does payment work?',
    a: 'We accept payments via PayPal. You can pay with credit cards, debit cards, or PayPal balance. All transactions are secure with no hidden fees.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. You can cancel your subscription at any time. You\'ll continue to have access to paid features until the end of your billing cycle.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer refunds within 7 days of purchase, no questions asked. Contact our support team for assistance.',
  },
  {
    q: 'Which languages are supported?',
    a: 'AI Resume Builder supports creating resumes in both English and Chinese, with AI-powered optimization suggestions.',
  },
];

export default function HomePage() {
  const [email, setEmail] = useState('');

  const handleWaitlist = () => {
    if (email) {
      alert('Thanks for joining the waitlist! We\'ll notify you soon.');
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
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              FAQ
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm mb-8">
            ✨ AI-Powered · Professional Templates · One-Click Export
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Build Your Dream Resume
            <br />
            <span className="text-primary">with AI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            No design skills. No writing experience needed. AI optimizes your content
            for ATS systems, offers beautiful templates, and creates a professional resume
            that gets you noticed — in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-base font-semibold text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Build My Resume Free →
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-base font-semibold border-2 hover:bg-muted transition-all"
            >
              Learn More
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">✓ No credit card required</span>
            <span className="flex items-center gap-1">✓ Free plan forever</span>
            <span className="flex items-center gap-1">✓ Upgrade anytime</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Create the Perfect Resume in 3 Steps</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', icon: '📝', title: 'Fill in Your Info', desc: 'Enter your personal details, work experience, education, and more.' },
              { step: '2', icon: '🤖', title: 'AI Optimization', desc: 'AI automatically optimizes your content and generates professional summaries.' },
              { step: '3', icon: '📥', title: 'Export & Apply', desc: 'Pick a template, export as PDF, and start applying with confidence.' },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 rounded-2xl border bg-card">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-primary font-bold text-sm mb-2">Step {item.step}</div>
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
          <h2 className="text-3xl font-bold text-center mb-4">Powerful Features to Stand Out</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            From content generation to polished layouts, AI Resume Builder provides a one-stop solution for creating winning resumes.
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
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-center mb-4">
            Start with our free plan. Upgrade anytime via PayPal.
          </p>
          <p className="text-muted-foreground text-center mb-16">
            All paid plans are securely processed through PayPal.
          </p>
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
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
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
                {(typeof plan.price === 'number' ? plan.price : parseFloat(plan.price)) > 0 && (
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Pay securely with PayPal
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">🔒 PayPal Secure Payment</span>
            <span className="flex items-center gap-1">↩️ Cancel Anytime</span>
            <span className="flex items-center gap-1">🌍 Global Support</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Join thousands of job seekers who landed their dream roles with AI Resume Builder.
          </p>
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

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-center mb-12">
            Everything you need to know about AI Resume Builder.
          </p>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="border rounded-xl transition-all">
                <summary className="p-5 cursor-pointer font-medium">{faq.q}</summary>
                <div className="px-5 pb-5 text-muted-foreground">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Perfect Resume?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of professionals who have landed their dream jobs with AI Resume Builder.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center h-14 px-10 rounded-xl text-lg font-semibold text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Free →
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
                Leverage AI to craft professional resumes and accelerate your career journey.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/register" className="hover:text-foreground">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#faq" className="hover:text-foreground">FAQ</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing & Payments</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-4">
            <span>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</span>
            <span className="opacity-60">PayPal Secure Payment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
