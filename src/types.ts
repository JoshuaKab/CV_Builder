export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface OnboardingData {
  jobTitle: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  industry: string;
}

export interface CareerRoadmap {
  roadmap: {
    step: string;
    description: string;
    timeframe: string;
  }[];
  skillsToAcquire: string[];
  strategicAdvice: string[];
  interviewQuestions: {
    question: string;
    advice: string;
  }[];
}

export interface CVData {
  templateId: string;
  onboarding?: OnboardingData;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: string[];
}
