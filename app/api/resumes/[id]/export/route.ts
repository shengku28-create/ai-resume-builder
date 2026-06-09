import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { ResumeContent } from '@/lib/types';
import { generatePrintReadyHTML } from '@/lib/resume-renderer';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const body = await req.json();
  const { resumeId } = body;

  let resumeContent: ResumeContent;

  if (resumeId) {
    // Load from database
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId: (session.user as any).id },
      include: { sections: true },
    });

    if (!resume) {
      return NextResponse.json({ error: '简历不存在' }, { status: 404 });
    }

    const sections = resume.sections.reduce(
      (acc: any, section: any) => {
        acc[section.type] = section.content;
        return acc;
      },
      {} as Record<string, any>
    );

    resumeContent = {
      personalInfo: sections['PERSONAL_INFO'] || {
        fullName: '', email: '', phone: '', location: '',
        linkedin: '', website: '', title: '',
      },
      summary: sections['SUMMARY'] || '',
      experiences: sections['EXPERIENCE'] || [],
      education: sections['EDUCATION'] || [],
      skills: sections['SKILLS'] || [],
      projects: sections['PROJECTS'] || [],
      certifications: sections['CERTIFICATIONS'] || [],
      languages: sections['LANGUAGES'] || [],
    };
  } else {
    resumeContent = body.content as ResumeContent;
  }

  // Use print-ready HTML for better PDF quality
  const resumeHTML = generatePrintReadyHTML({
    template: body.template || 'modern',
    content: resumeContent,
  });

  // Return the HTML so the client can use browser print for PDF
  // The client should use window.print() with this HTML for best PDF output
  return NextResponse.json({ html: resumeHTML });
}
