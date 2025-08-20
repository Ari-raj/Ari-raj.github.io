
export interface FileItem {
  id: string;
  title: string;
  description: string;
  url?: string; // Optional for text files
  content?: string; // Optional for URL-based files
}

export interface Skills {
  [category: string]: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface About {
  name: string;
  tagline: string;
  professionalStatement: string;
  achievements: string[];
  photoUrl: string;
}

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface Content {
  projects: FileItem[];
  certificates: FileItem[];
  skills: Skills;
  education: EducationItem[];
  about: About;
  contact: Contact;
}

export type AppId = 
  | 'projects' 
  | 'certificates' 
  | 'skills' 
  | 'education' 
  | 'terminal' 
  | 'admin' 
  | 'login' 
  | 'about' 
  | 'gmail'
  | 'linkedin'
  | 'github'
  | 'phone'
  | 'viewer';

export interface AppConfig {
  title: string;
  iconUrl: string;
  defaultSize: { width: number; height: number };
  isExternal?: boolean;
  url?: string;
}

export interface WindowInstance {
  id: string;
  appId: AppId;
  title: string;
  iconUrl: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  data?: any; // For passing data to the window, e.g., file to view
}
