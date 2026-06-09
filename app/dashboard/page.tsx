'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Resume {
  id: string;
  title: string;
  template: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  sections: any[];
}

interface UserData {
  id: string;
  name: string | null;
  email: string;
  plan: string;
  planExpires: string | null;
  resumeCount: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/user');
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('获取用户信息失败');
      }
      const data = await res.json();
      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
    }
    try {
      const res = await fetch('/api/resumes');
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes);
      }
    } catch (err: any) {
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '我的简历', template: 'modern' }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 403 && data.plan === 'FREE') {
          alert(data.error + '，请升级到专业版。');
          router.push('/pricing');
        } else {
          throw new Error(data.error);
        }
        return;
      }

      const data = await res.json();
      router.push(`/editor/${data.resume.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            <span className="text-primary">AI</span> Resume Builder
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline">
              {user?.name || user?.email}
            </span>
            <Link href="/pricing" className="text-sm text-primary font-medium hover:underline">
              升级
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              退出
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* User info card */}
        <div className="bg-card border rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                欢迎回来，{user?.name || '用户'}！
              </h1>
              <p className="text-muted-foreground">
                套餐: <span className={`font-medium ${user?.plan === 'PRO' ? 'text-primary' : user?.plan === 'ENTERPRISE' ? 'text-yellow-600' : ''}`}>{user?.plan}</span>
                {user?.planExpires && (
                  <span className="text-xs text-muted-foreground ml-2">
                    · 到期: {new Date(user.planExpires).toLocaleDateString()}
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={createResume}
                className="inline-flex items-center h-10 px-5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                + 创建新简历
              </button>
            </div>
          </div>

          {/* Plan features quick view */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary">{user?.resumeCount || 0}</div>
              <div className="text-xs text-muted-foreground">简历数量</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold">
                {user?.plan === 'FREE' ? '2' : user?.plan === 'PRO' ? '10' : '∞'}
              </div>
              <div className="text-xs text-muted-foreground">最大额度</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold">
                {user?.plan === 'FREE' ? '3' : user?.plan === 'PRO' ? '50' : '∞'}
              </div>
              <div className="text-xs text-muted-foreground">AI优化次数</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold">
                {user?.plan === 'FREE' ? '1' : user?.plan === 'PRO' ? '3' : '4'}
              </div>
              <div className="text-xs text-muted-foreground">可用模板</div>
            </div>
          </div>
        </div>

        {/* Resumes List */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">我的简历</h2>
          {resumes.length > 0 && (
            <span className="text-sm text-muted-foreground">
              共 {resumes.length} 份
            </span>
          )}
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {resumes.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-2xl">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-bold mb-2">还没有简历</h3>
            <p className="text-muted-foreground mb-6">创建你的第一份专业简历</p>
            <button
              onClick={createResume}
              className="inline-flex items-center h-10 px-5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              + 创建第一份简历
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="group border rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer"
              >
                <Link href={`/editor/${resume.id}`} className="block">
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    {resume.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-muted">
                      {resume.template}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      resume.status === 'OPTIMIZED' ? 'bg-green-100 text-green-700' :
                      resume.status === 'FINISHED' ? 'bg-primary/10 text-primary' :
                      'bg-muted'
                    }`}>
                      {resume.status === 'DRAFT' ? '草稿' : resume.status === 'OPTIMIZED' ? '已优化' : '已完成'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    更新于 {new Date(resume.updatedAt).toLocaleDateString('zh-CN')}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
