export type Category = 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other';
export type Status = 'completed' | 'in-progress' | 'concept';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  category: Category;
  tags: string[];
  technologies: string[];
  year: number;
  client?: string;
  role: string;
  duration?: string;
  status: Status;
  featured: boolean;
  order: number;
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  websiteEmbed?: string;

  // Modern content structure
  overview?: string;
  keyFeatures?: string[];
  impact?: {
    metrics?: Array<{
      label: string;
      value: string;
      description?: string;
    }>;
    achievements?: string[];
  };
  approach?: {
    methodology?: string;
    keyDecisions?: Array<{
      decision: string;
      rationale: string;
    }>;
  };
  learnings?: string[];

  // Legacy case study (for backward compatibility)
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
  category: Category;
  tags: string[];
  technologies: string[];
  year: number;
  client?: string;
  role: string;
  duration?: string;
  status: Status;
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
