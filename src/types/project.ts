export type Category = 'web' | 'mobile' | 'branding' | 'ui-ux' | 'other';
export type Status = 'completed' | 'in-progress' | 'concept';

export interface Project {
  id: string;
  title: string;
  description: string;
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

  // Modern Client-Friendly Content Structure
  // 🔥 The Challenge - One simple sentence that anyone can understand
  challenge?: string;

  // 🔥 Approach - 2-3 key moves (not jargon, plain language)
  approachBullets?: string[];

  // 🔥 Value Delivered - Talk outcomes, not deliverables
  valueDelivered?: Array<{
    label: string;
    value: string;
  }>;

  // 🔥 Client Perspective - Short authentic feedback
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };

  // 🔥 Relevance Note - Personal connection to the work
  relevanceNote?: string;

  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
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
  challenge?: string;
  approachBullets?: string[];
  valueDelivered?: Array<{
    label: string;
    value: string;
  }>;
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
  relevanceNote?: string;
}

export interface ProjectFilters {
  category?: string;
  status?: string;
  featured?: boolean;
  year?: number;
  tags?: string[];
}
