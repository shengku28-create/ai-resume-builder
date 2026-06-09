import type { ResumeContent } from '@/lib/types';

export interface ResumeConfig {
  template: string;
  content: ResumeContent;
  userName?: string;
}

export function generateResumeHTML(config: ResumeConfig): string {
  const { template, content, userName } = config;

  switch (template) {
    case 'professional':
      return generateProfessionalTemplate(config);
    case 'minimal':
      return generateMinimalTemplate(config);
    case 'creative':
      return generateCreativeTemplate(config);
    default:
      return generateModernTemplate(config);
  }
}

function generateModernTemplate(config: ResumeConfig): string {
  const { content } = config;
  const { personalInfo, summary, experiences, education, skills, projects, certifications, languages } = content;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.fullName} - 简历</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; background: #f5f5f5; color: #333; line-height: 1.6; }
    .resume { max-width: 800px; margin: 0 auto; background: white; padding: 0; box-shadow: 0 2px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; }
    .header h1 { font-size: 32px; font-weight: 700; margin-bottom: 8px; }
    .header .title { font-size: 16px; opacity: 0.9; margin-bottom: 16px; }
    .contact { display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; opacity: 0.9; }
    .contact span { display: flex; align-items: center; gap: 6px; }
    .body { padding: 40px; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 18px; font-weight: 700; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; }
    .summary { font-size: 15px; color: #555; line-height: 1.8; padding: 16px; background: #f8f9ff; border-radius: 8px; border-left: 4px solid #667eea; }
    .item { margin-bottom: 20px; }
    .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
    .item-title { font-size: 16px; font-weight: 600; color: #333; }
    .item-subtitle { font-size: 14px; color: #667eea; font-weight: 500; }
    .item-date { font-size: 13px; color: #888; white-space: nowrap; }
    .item-desc { font-size: 14px; color: #555; margin-top: 6px; line-height: 1.7; }
    .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .skill-item { display: flex; align-items: center; gap: 10px; font-size: 14px; }
    .skill-bar { flex: 1; height: 8px; background: #e8e8e8; border-radius: 4px; overflow: hidden; }
    .skill-fill { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 4px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag { background: #f0f0ff; color: #667eea; padding: 4px 12px; border-radius: 20px; font-size: 13px; }
    .lang-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .lang-item { text-align: center; padding: 12px; background: #f8f9ff; border-radius: 8px; }
    .lang-name { font-weight: 600; font-size: 14px; }
    .lang-level { font-size: 12px; color: #888; margin-top: 4px; }
    .projects-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
    .project-card { border: 1px solid #e8e8e8; border-radius: 8px; padding: 16px; }
    .project-name { font-weight: 600; font-size: 15px; color: #333; }
    .project-tech { font-size: 12px; color: #667eea; margin-top: 4px; }
    @media print {
      body { background: white; }
      .resume { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="resume">
    <div class="header">
      <h1>${personalInfo.fullName}</h1>
      ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
      <div class="contact">
        ${personalInfo.email ? `<span>✉ ${personalInfo.email}</span>` : ''}
        ${personalInfo.phone ? `<span>☎ ${personalInfo.phone}</span>` : ''}
        ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
        ${personalInfo.linkedin ? `<span>🔗 ${personalInfo.linkedin}</span>` : ''}
        ${personalInfo.website ? `<span>🌐 ${personalInfo.website}</span>` : ''}
      </div>
    </div>
    <div class="body">
      ${summary ? `
      <div class="section">
        <div class="section-title">职业概述</div>
        <div class="summary">${summary}</div>
      </div>` : ''}
      ${experiences.length > 0 ? `
      <div class="section">
        <div class="section-title">工作经历</div>
        ${experiences.map(exp => `
          <div class="item">
            <div class="item-header">
              <div>
                <div class="item-title">${exp.position}</div>
                <div class="item-subtitle">${exp.company}</div>
              </div>
              <div class="item-date">${exp.startDate} - ${exp.current ? '至今' : exp.endDate}</div>
            </div>
            ${exp.description ? `<div class="item-desc">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
          </div>
        `).join('')}
      </div>` : ''}
      ${education.length > 0 ? `
      <div class="section">
        <div class="section-title">教育背景</div>
        ${education.map(edu => `
          <div class="item">
            <div class="item-header">
              <div>
                <div class="item-title">${edu.institution}</div>
                <div class="item-subtitle">${edu.degree} ${edu.field ? `· ${edu.field}` : ''}</div>
              </div>
              <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
            </div>
            ${edu.gpa ? `<div class="item-desc">GPA: ${edu.gpa}</div>` : ''}
          </div>
        `).join('')}
      </div>` : ''}
      ${skills.length > 0 ? `
      <div class="section">
        <div class="section-title">技能</div>
        <div class="skills-grid">
          ${skills.map(skill => {
            const width = { beginner: 25, intermediate: 50, advanced: 75, expert: 100 }[skill.level] || 50;
            return `<div class="skill-item">
              <span style="min-width: 80px;">${skill.name}</span>
              <div class="skill-bar"><div class="skill-fill" style="width: ${width}%"></div></div>
            </div>`;
          }).join('')}
        </div>
      </div>` : ''}
      ${projects.length > 0 ? `
      <div class="section">
        <div class="section-title">项目经验</div>
        <div class="projects-grid">
          ${projects.map(proj => `
            <div class="project-card">
              <div class="project-name">${proj.name}${proj.url ? ` <a href="${proj.url}" style="color:#667eea;font-size:12px;">🔗</a>` : ''}</div>
              ${proj.technologies ? `<div class="project-tech">技术栈: ${proj.technologies}</div>` : ''}
              ${proj.description ? `<div class="item-desc" style="margin-top:8px;">${proj.description.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>` : ''}
      ${certifications.length > 0 ? `
      <div class="section">
        <div class="section-title">证书</div>
        <div class="tags">
          ${certifications.map(cert => `<span class="tag">${cert.name} - ${cert.issuer} (${cert.date})</span>`).join('')}
        </div>
      </div>` : ''}
      ${languages.length > 0 ? `
      <div class="section">
        <div class="section-title">语言能力</div>
        <div class="lang-grid">
          ${languages.map(lang => `
            <div class="lang-item">
              <div class="lang-name">${lang.name}</div>
              <div class="lang-level">${{basic:'基础',intermediate:'中等',fluent:'流利',native:'母语'}[lang.proficiency] || lang.proficiency}</div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
    </div>
  </div>
</body>
</html>`;
}

function generateProfessionalTemplate(config: ResumeConfig): string {
  const { content } = config;
  const { personalInfo, summary, experiences, education, skills, projects, certifications, languages } = content;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${personalInfo.fullName} - 简历</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', 'SimSun', serif; color: #222; line-height: 1.6; background: #fafafa; }
    .resume { max-width: 750px; margin: 0 auto; background: white; padding: 50px 60px; }
    .header { text-align: center; border-bottom: 3px double #333; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { font-size: 28px; letter-spacing: 2px; margin-bottom: 8px; }
    .header .title { font-size: 14px; color: #666; margin-bottom: 12px; }
    .contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; font-size: 13px; color: #555; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #ccc; padding-bottom: 6px; margin-bottom: 14px; color: #333; }
    .item { margin-bottom: 16px; }
    .item-header { display: flex; justify-content: space-between; }
    .item-title { font-weight: 700; font-size: 15px; }
    .item-subtitle { font-style: italic; color: #555; }
    .item-date { color: #777; font-size: 13px; white-space: nowrap; }
    .item-desc { font-size: 14px; color: #444; margin-top: 4px; }
    .summary { font-size: 14px; color: #444; line-height: 1.8; margin-bottom: 20px; text-align: justify; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-tag { border: 1px solid #ccc; padding: 3px 12px; font-size: 13px; color: #333; }
  </style>
</head>
<body>
  <div class="resume">
    <div class="header">
      <h1>${personalInfo.fullName}</h1>
      ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
      <div class="contact">
        ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
        ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
        ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ''}
        ${personalInfo.linkedin ? `<span>${personalInfo.linkedin}</span>` : ''}
      </div>
    </div>
    ${summary ? `<div class="summary">${summary}</div>` : ''}
    ${experiences.map(exp => `
      <div class="section">
        <div class="section-title">工作经历</div>
        <div class="item">
          <div class="item-header">
            <div><div class="item-title">${exp.position}</div><div class="item-subtitle">${exp.company}</div></div>
            <div class="item-date">${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}</div>
          </div>
          ${exp.description ? `<div class="item-desc">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
      </div>
    `).join('')}
    ${education.length > 0 ? `
      <div class="section">
        <div class="section-title">教育背景</div>
        ${education.map(edu => `
          <div class="item">
            <div class="item-header">
              <div><div class="item-title">${edu.institution}</div><div class="item-subtitle">${edu.degree} ${edu.field || ''}</div></div>
              <div class="item-date">${edu.startDate} – ${edu.endDate}</div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}
    ${skills.length > 0 ? `
      <div class="section">
        <div class="section-title">技能</div>
        <div class="skills-list">
          ${skills.map(s => `<span class="skill-tag">${s.name}</span>`).join('')}
        </div>
      </div>
    ` : ''}
  </div>
</body>
</html>`;
}

function generateMinimalTemplate(config: ResumeConfig): string {
  const { content } = config;
  const { personalInfo, summary, experiences, education, skills } = content;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${personalInfo.fullName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111; line-height: 1.7; background: #fff; max-width: 700px; margin: 0 auto; padding: 60px 40px; }
    h1 { font-size: 36px; font-weight: 300; letter-spacing: -1px; margin-bottom: 4px; }
    .title { font-size: 16px; color: #888; margin-bottom: 12px; }
    .contact { font-size: 13px; color: #666; margin-bottom: 40px; display: flex; gap: 16px; flex-wrap: wrap; }
    .section { margin-bottom: 32px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #999; margin-bottom: 16px; }
    .item { margin-bottom: 16px; }
    .item-header { display: flex; justify-content: space-between; align-items: baseline; }
    .item-title { font-size: 15px; font-weight: 600; }
    .item-sub { font-size: 14px; color: #666; }
    .item-date { font-size: 12px; color: #999; }
    .item-desc { font-size: 14px; color: #444; margin-top: 4px; }
    .summary { font-size: 15px; color: #444; margin-bottom: 32px; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tag { font-size: 13px; color: #555; }
  </style>
</head>
<body>
  <h1>${personalInfo.fullName}</h1>
  ${personalInfo.title ? `<div class="title">${personalInfo.title}</div>` : ''}
  <div class="contact">
    ${personalInfo.email || ''}${personalInfo.phone ? ` · ${personalInfo.phone}` : ''}${personalInfo.location ? ` · ${personalInfo.location}` : ''}
  </div>
  ${summary ? `<div class="summary">${summary}</div>` : ''}
  ${experiences.map(exp => `
    <div class="section">
      <div class="section-title">Experience</div>
      <div class="item">
        <div class="item-header">
          <div><div class="item-title">${exp.position}</div><div class="item-sub">${exp.company}</div></div>
          <div class="item-date">${exp.startDate} – ${exp.current ? 'Now' : exp.endDate}</div>
        </div>
        ${exp.description ? `<div class="item-desc">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
      </div>
    </div>
  `).join('')}
  ${education.length > 0 ? `
    <div class="section">
      <div class="section-title">Education</div>
      ${education.map(edu => `
        <div class="item">
          <div class="item-header">
            <div><div class="item-title">${edu.institution}</div><div class="item-sub">${edu.degree} ${edu.field || ''}</div></div>
            <div class="item-date">${edu.startDate} – ${edu.endDate}</div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : ''}
  ${skills.length > 0 ? `
    <div class="section">
      <div class="section-title">Skills</div>
      <div class="tags">
        ${skills.map(s => `<span class="tag">${s.name}</span>`).join(' · ')}
      </div>
    </div>
  ` : ''}
</body>
</html>`;
}

function generateCreativeTemplate(config: ResumeConfig): string {
  // Reuse modern template with a slightly different style
  return generateModernTemplate(config);
}

export function downloadResumeHTML(html: string, filename: string = 'resume.html'): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Generate print-ready HTML with @media print styles
 * This is optimized for PDF generation via browser print dialog
 */
export function generatePrintReadyHTML(config: ResumeConfig): string {
  const html = generateResumeHTML(config);
  // Add print-specific meta to enhance PDF output quality
  return html.replace(
    '</head>',
    `<style>
@media print {
  body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  .resume { box-shadow: none !important; margin: 0 !important; }
  @page { margin: 0.5in; size: letter; }
}
</style></head>`
  );
}
