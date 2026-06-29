export type RoleType = 'Recruiter' | 'HR Manager' | 'Hiring Team';

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  role: RoleType;
}

export interface CareerItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  years: number;
  achievements: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
}

export interface SkillMatchBreakdown {
  label: string;
  score: number; // 0 - 100
  matched: string[];
  missing: string[];
}

export interface EvaluationScore {
  skillMatch: number;      // 30%
  experienceMatch: number;   // 20%
  careerGrowth: number;      // 10%
  education: number;         // 10%
  behavioralSignals: number; // 15%
  projectRelevance: number;  // 10%
  culturalFit: number;       // 5%
  finalScore: number;        // weighted 0-100
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  title: string;
  experienceYears: number;
  noticePeriod: string;
  location: string;
  skills: string[];
  certifications: string[];
  education: EducationItem[];
  careerHistory: CareerItem[];
  projects: ProjectItem[];
  status: 'Applied' | 'Shortlisted' | 'Rejected';
  scoresByJob: Record<string, EvaluationScore>; // key is JobID
  aiExplanationsByJob: Record<string, string>;  // why this candidate?
  parsedResumeText: string;
  notes?: string;
  interviewSlot?: string; // e.g. "2026-06-22T14:00" or similar
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Part-time';
  experienceLevel: string;
  rawText: string;
  skillsRequired: string[];
  skillsPreferred: string[];
  domainExpertise: string[];
  softSkills: string[];
  experienceRequirement: string;
  behavioralTraits: string[];
}
