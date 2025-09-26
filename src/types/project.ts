export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  category: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other';
  tags: string[];
  technologies: string[];
  year: number;
  client?: string;
  role: string;
  duration?: string;
  status: 'completed' | 'in-progress' | 'concept';
  featured: boolean;
  order: number;
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  websiteEmbed?: string;
  caseStudy?: {
    challenge: string;
    solution: string;
    process: string[];
    results: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  category: 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other';
  tags: string[];
  technologies: string[];
  year: number;
  client?: string;
  role: string;
  duration?: string;
  status: 'completed' | 'in-progress' | 'concept';
  featured: boolean;
  order: number;
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  websiteEmbed?: string;
  caseStudy?: {
    challenge: string;
    solution: string;
    process: string[];
    results: string[];
  };
}

export interface ProjectFilters {
  category?: string;
  status?: string;
  featured?: boolean;
  year?: number;
  tags?: string[];
}
