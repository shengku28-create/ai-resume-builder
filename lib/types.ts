export type PlanType = 'FREE' | 'PRO' | 'ENTERPRISE';

export type ResumeStatus = 'DRAFT' | 'OPTIMIZED' | 'FINISHED';

export type SectionType =
  | 'PERSONAL_INFO'
  | 'SUMMARY'
  | 'EXPERIENCE'
  | 'EDUCATION'
  | 'SKILLS'
  | 'PROJECTS'
  | 'CERTIFICATIONS'
  | 'LANGUAGES';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  title: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'intermediate' | 'fluent' | 'native';
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}

export type ResumeTemplate = 'modern' | 'professional' | 'minimal' | 'creative';

export interface PlanFeatures {
  maxResumes: number;
  maxSections: number;
  aiOptimizations: number;
  templates: ResumeTemplate[];
  pdfExport: boolean;
  coverLetter: boolean;
  prioritySupport: boolean;
}

export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  FREE: {
    maxResumes: 2,
    maxSections: 5,
    aiOptimizations: 3,
    templates: ['modern'],
    pdfExport: true,
    coverLetter: false,
    prioritySupport: false,
  },
  PRO: {
    maxResumes: 10,
    maxSections: 8,
    aiOptimizations: 50,
    templates: ['modern', 'professional', 'minimal'],
    pdfExport: true,
    coverLetter: true,
    prioritySupport: false,
  },
  ENTERPRISE: {
    maxResumes: -1,
    maxSections: 8,
    aiOptimizations: -1,
    templates: ['modern', 'professional', 'minimal', 'creative'],
    pdfExport: true,
    coverLetter: true,
    prioritySupport: true,
  },
};

export const RESUME_STEPS = [
  { id: 1, key: 'personalInfo', label: '个人信息' },
  { id: 2, key: 'summary', label: '职业概述' },
  { id: 3, key: 'experience', label: '工作经历' },
  { id: 4, key: 'education', label: '教育背景' },
  { id: 5, key: 'skills', label: '技能' },
  { id: 6, key: 'projects', label: '项目经验' },
  { id: 7, key: 'additional', label: '证书与语言' },
  { id: 8, key: 'review', label: '预览导出' },
] as const;
