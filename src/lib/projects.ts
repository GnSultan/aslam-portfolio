import { Project, ProjectFormData } from '@/types/project';

// In a real app, this would be replaced with API calls or database operations
// For now, we'll use localStorage for persistence

const STORAGE_KEY = 'portfolio_projects';

export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading projects:', error);
  }
  
  // Return default projects if none exist
  return getDefaultProjects();
};

export const getProject = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find(project => project.id === id) || null;
};

export const createProject = (projectData: ProjectFormData): Project => {
  const projects = getProjects();
  const newProject: Project = {
    ...projectData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const updatedProjects = [...projects, newProject];
  saveProjects(updatedProjects);
  return newProject;
};

export const updateProject = (id: string, projectData: Partial<ProjectFormData>): Project | null => {
  const projects = getProjects();
  const projectIndex = projects.findIndex(project => project.id === id);
  
  if (projectIndex === -1) return null;
  
  const updatedProject: Project = {
    ...projects[projectIndex],
    ...projectData,
    updatedAt: new Date().toISOString(),
  };
  
  const updatedProjects = [...projects];
  updatedProjects[projectIndex] = updatedProject;
  saveProjects(updatedProjects);
  return updatedProject;
};

export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filteredProjects = projects.filter(project => project.id !== id);
  
  if (filteredProjects.length === projects.length) return false;
  
  saveProjects(filteredProjects);
  return true;
};

export const getFeaturedProjects = (): Project[] => {
  const projects = getProjects();
  return projects
    .filter(project => project.featured)
    .sort((a, b) => a.order - b.order);
};

export const getProjectsByCategory = (category: string): Project[] => {
  const projects = getProjects();
  return projects.filter(project => project.category === category);
};

const saveProjects = (projects: Project[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getDefaultProjects = (): Project[] => {
  return [
    {
      id: '1',
      title: 'Rejuvenate',
      description: 'Mental health platform',
      longDescription: 'A comprehensive mental health platform designed to provide accessible therapy and wellness tools for users worldwide.',
      image: '/placeholders/rejuvenate-mockup.jpg',
      images: ['/placeholders/rejuvenate-mockup.jpg'],
      category: 'web',
      tags: ['Mental Health', 'Wellness', 'SaaS'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Figma'],
      year: 2024,
      client: 'Rejuvenate Inc.',
      role: 'Lead UI/UX Designer',
      duration: '6 months',
      status: 'completed',
      featured: true,
      order: 1,
      liveUrl: 'https://rejuvenate.app',
      caseStudy: {
        challenge: 'Creating an accessible and trustworthy platform for mental health services.',
        solution: 'Designed a calming, intuitive interface with clear navigation and privacy-focused features.',
        process: ['Research & Discovery', 'User Journey Mapping', 'Wireframing', 'Prototyping', 'User Testing'],
        results: ['40% increase in user engagement', '95% user satisfaction score', '50% reduction in bounce rate']
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Job Portal',
      description: 'Modern job search platform',
      longDescription: 'A modern job search platform that connects talented professionals with innovative companies.',
      image: '/placeholders/job-portal-mockup.jpg',
      images: ['/placeholders/job-portal-mockup.jpg'],
      category: 'web',
      tags: ['Job Search', 'Recruitment', 'Platform'],
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
      year: 2024,
      client: 'TechJobs Ltd.',
      role: 'Product Designer',
      duration: '4 months',
      status: 'completed',
      featured: true,
      order: 2,
      liveUrl: 'https://techjobs.com',
      caseStudy: {
        challenge: 'Simplifying the job search process for both candidates and employers.',
        solution: 'Created an intuitive matching system with advanced filtering and real-time notifications.',
        process: ['User Research', 'Competitive Analysis', 'Information Architecture', 'Visual Design', 'Prototyping'],
        results: ['60% faster job matching', '35% increase in successful placements', '4.8/5 user rating']
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Desserts',
      description: 'E-commerce for artisanal desserts',
      longDescription: 'An elegant e-commerce platform for premium artisanal desserts with a focus on visual appeal and user experience.',
      image: '/placeholders/desserts-mockup.jpg',
      images: ['/placeholders/desserts-mockup.jpg'],
      category: 'web',
      tags: ['E-commerce', 'Food & Beverage', 'Artisanal'],
      technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
      year: 2023,
      client: 'Sweet Dreams Bakery',
      role: 'Brand & Web Designer',
      duration: '3 months',
      status: 'completed',
      featured: true,
      order: 3,
      liveUrl: 'https://sweetdreams.desserts',
      caseStudy: {
        challenge: 'Creating an appetizing online experience that drives sales for artisanal desserts.',
        solution: 'Designed a mouth-watering interface with high-quality imagery and seamless checkout process.',
        process: ['Brand Strategy', 'Visual Identity', 'E-commerce Design', 'Photography Direction', 'Launch'],
        results: ['200% increase in online sales', '45% higher average order value', '90% customer retention rate']
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};
