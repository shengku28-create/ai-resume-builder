'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params?.id as string;

  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('personalInfo');

  // Resume data state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '', email: '', phone: '', location: '', linkedin: '', website: '', title: '',
  });
  const [summary, setSummary] = useState('');
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (resumeId) {
      fetchResume();
    } else {
      setLoading(false);
    }
  }, [resumeId]);

  const fetchResume = async () => {
    try {
      const res = await fetch(`/api/resumes/${resumeId}`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('获取简历失败');
      }
      const data = await res.json();
      setResume(data.resume);

      const sections: any = {};
      data.resume.sections.forEach((s: any) => {
        sections[s.type] = s.content;
      });

      setPersonalInfo(sections['PERSONAL_INFO'] || personalInfo);
      setSummary(sections['SUMMARY'] || '');
      setExperiences(sections['EXPERIENCE'] || []);
      setEducation(sections['EDUCATION'] || []);
      setSkills(sections['SKILLS'] || []);
      setProjects(sections['PROJECTS'] || []);
      setCertifications(sections['CERTIFICATIONS'] || []);
      setLanguages(sections['LANGUAGES'] || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (type: string, content: any) => {
    setSaving(true);
    try {
      await fetch(`/api/resumes/${resumeId}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content, order: 0 }),
      });
      await fetchResume();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await fetch(`/api/resumes/${resumeId}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeId,
          template: resume?.template || 'modern',
          content: {
            personalInfo, summary, experiences, education, skills, projects, certifications, languages,
          },
        }),
      });

      if (!res.ok) throw new Error('导出失败');
      const data = await res.json();

      // Open HTML in new window for download/PDF
      const blob = new Blob([data.html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Toolbar */}
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            ← 返回
          </Link>
          <span className="font-medium">简历编辑器</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="h-9 px-4 rounded-lg text-sm border hover:bg-muted"
          >
            {showPreview ? '编辑' : '预览'}
          </button>
          <button
            onClick={handleExport}
            className="h-9 px-4 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            📥 导出PDF
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 mx-4 mt-2 rounded-lg">
          {error}
        </div>
      )}

      {!showPreview ? (
        <div className="flex-1 flex">
          {/* Section navigation */}
          <aside className="w-56 border-r p-4 hidden md:block">
            <nav className="space-y-1">
              {[
                { id: 'personalInfo', label: '个人信息' },
                { id: 'summary', label: '职业概述' },
                { id: 'experiences', label: '工作经历' },
                { id: 'education', label: '教育背景' },
                { id: 'skills', label: '技能' },
                { id: 'projects', label: '项目经验' },
                { id: 'certifications', label: '证书' },
                { id: 'languages', label: '语言' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Editor */}
          <main className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'personalInfo' && (
              <div className="max-w-lg space-y-4">
                <h2 className="text-xl font-bold mb-4">个人信息</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">姓名</label>
                    <input
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border text-sm"
                      placeholder="你的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">职位头衔</label>
                    <input
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border text-sm"
                      placeholder="如：软件工程师"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">邮箱</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border text-sm"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">电话</label>
                    <input
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border text-sm"
                      placeholder="+86 138 0000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">所在地</label>
                    <input
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border text-sm"
                      placeholder="城市"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                    <input
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border text-sm"
                      placeholder="linkedin.com/in/xxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">个人网站</label>
                    <input
                      value={personalInfo.website}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border text-sm"
                      placeholder="yourwebsite.com"
                    />
                  </div>
                </div>
                <button
                  onClick={() => saveSection('PERSONAL_INFO', personalInfo)}
                  disabled={saving}
                  className="h-10 px-6 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving ? '保存中...' : '保存'}
                </button>
              </div>
            )}

            {activeSection === 'summary' && (
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">职业概述</h2>
                  <button className="text-sm text-primary hover:underline">✨ AI生成</button>
                </div>
                <p className="text-sm text-muted-foreground">
                  撰写一段200-250字的职业概述，突出你的核心竞争力和相关经验。
                </p>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={8}
                  className="w-full p-3 rounded-lg border text-sm resize-none"
                  placeholder="撰写你的职业概述..."
                />
                <button
                  onClick={() => saveSection('SUMMARY', summary)}
                  disabled={saving}
                  className="h-10 px-6 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving ? '保存中...' : '保存'}
                </button>
              </div>
            )}

            {['experiences', 'education', 'skills', 'projects', 'certifications', 'languages'].includes(activeSection) && (
              <div className="max-w-2xl space-y-4">
                <h2 className="text-xl font-bold capitalize">{activeSection}</h2>
                <div className="p-8 text-center border-2 border-dashed rounded-xl text-muted-foreground">
                  <p>编辑功能开发中...</p>
                  <p className="text-sm mt-2">请在后续版本中添加完整的CRUD功能</p>
                </div>
              </div>
            )}
          </main>
        </div>
      ) : (
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">简历预览</h2>
          <div className="max-w-3xl mx-auto border rounded-lg overflow-hidden bg-white">
            <iframe
              srcDoc={`
                <style>
                  body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
                  .resume { max-width: 800px; margin: 0 auto; }
                  .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 40px; }
                  .header h1 { font-size: 32px; margin-bottom: 8px; }
                  .header .title { font-size: 16px; opacity: 0.9; margin-bottom: 16px; }
                  .contact { display: flex; gap: 16px; font-size: 13px; opacity: 0.9; flex-wrap: wrap; }
                  .body { padding: 40px; }
                  .section { margin-bottom: 28px; }
                  .section-title { font-size: 18px; font-weight: 700; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 16px; }
                  .summary { padding: 16px; background: #f8f9ff; border-radius: 8px; border-left: 4px solid #667eea; line-height: 1.8; }
                  .item { margin-bottom: 20px; }
                  .item-title { font-size: 16px; font-weight: 600; }
                  .item-subtitle { font-size: 14px; color: #667eea; }
                  .item-desc { font-size: 14px; color: #555; margin-top: 6px; }
                </style>
                <div class="resume">
                  <div class="header">
                    <h1>${personalInfo.fullName || '姓名'}</h1>
                    ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
                    <div class="contact">
                      ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
                      ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
                      ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ''}
                    </div>
                  </div>
                  <div class="body">
                    ${summary ? `<div class="section"><div class="section-title">职业概述</div><div class="summary">${summary}</div></div>` : ''}
                    <p class="item-desc" style="color:#999;margin-top:40px;text-align:center;">
                      导出后可查看完整预览
                    </p>
                  </div>
                </div>
              `}
              className="w-full border-0"
              style={{ height: '600px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
