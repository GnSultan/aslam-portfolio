import { Project, ProjectFormData } from '@/types/project';
import { supabase } from './supabase';

// Database field mapping (snake_case in DB, camelCase in code)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDbToProject = (dbRow: any): Project => {
  return {
    id: dbRow.id,
    title: dbRow.title,
    description: dbRow.description,
    image: dbRow.image,
    images: (dbRow.images || []).filter((img: string) => img && img.trim() !== ''),
    category: dbRow.category,
    tags: dbRow.tags || [],
    technologies: dbRow.technologies || [],
    year: dbRow.year,
    client: dbRow.client,
    role: dbRow.role,
    duration: dbRow.duration,
    status: dbRow.status,
    featured: dbRow.featured,
    order: dbRow.order,
    liveUrl: dbRow.live_url,
    githubUrl: dbRow.github_url,
    behanceUrl: dbRow.behance_url,
    websiteEmbed: dbRow.website_embed,
    challenge: dbRow.challenge,
    approachBullets: dbRow.approach_bullets || [],
    valueDelivered: dbRow.value_delivered || [],
    testimonial: dbRow.testimonial,
    relevanceNote: dbRow.relevance_note,
    createdAt: dbRow.created_at,
    updatedAt: dbRow.updated_at,
  };
};

const mapProjectToDb = (project: Partial<ProjectFormData>) => {
  return {
    title: project.title,
    description: project.description,
    image: project.image,
    images: project.images?.filter(img => img && img.trim() !== '') || [],
    category: project.category,
    tags: project.tags,
    technologies: project.technologies,
    year: project.year,
    client: project.client,
    role: project.role,
    duration: project.duration,
    status: project.status,
    featured: project.featured,
    order: project.order,
    live_url: project.liveUrl,
    github_url: project.githubUrl,
    behance_url: project.behanceUrl,
    website_embed: project.websiteEmbed,
    challenge: project.challenge,
    approach_bullets: project.approachBullets,
    value_delivered: project.valueDelivered,
    testimonial: project.testimonial,
    relevance_note: project.relevanceNote,
  };
};

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    return getDefaultProjects();
  }

  if (!data || data.length === 0) {
    return getDefaultProjects();
  }

  return data.map(mapDbToProject);
};

export const getProject = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }

  return data ? mapDbToProject(data) : null;
};

export const createProject = async (projectData: ProjectFormData): Promise<Project> => {
  const id = generateId();
  const dbData = {
    id,
    ...mapProjectToDb(projectData),
  };

  const { data, error } = await supabase
    .from('projects')
    .insert(dbData)
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }

  return mapDbToProject(data);
};

export const updateProject = async (id: string, projectData: Partial<ProjectFormData>): Promise<Project | null> => {
  const dbData = mapProjectToDb(projectData);

  console.log('Updating project with data:', dbData);

  const { data, error } = await supabase
    .from('projects')
    .update(dbData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    console.error('Data being sent:', JSON.stringify(dbData, null, 2).substring(0, 500));
    throw new Error('Failed to update project');
  }

  return data ? mapDbToProject(data) : null;
};

export const deleteProject = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    return false;
  }

  return true;
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }

  return data ? data.map(mapDbToProject) : [];
};

export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category', category)
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }

  return data ? data.map(mapDbToProject) : [];
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Default projects as fallback
const SUPABASE_URL = 'https://ampovegjevdjlsjgkxgn.supabase.co/storage/v1/object/public/portfolio-assets/portfolio'

const getDefaultProjects = (): Project[] => {
  return [
    {
      id: '1',
      title: 'Flow',
      description: 'A modern productivity app that helps teams stay focused and ship faster',
      image: `${SUPABASE_URL}/Modern%20Interior%20Design.png`,
      images: [
        `${SUPABASE_URL}/Modern%20Interior%20Design.png`,
        `${SUPABASE_URL}/Minimalist%20Sphere%20Display.png`,
        `${SUPABASE_URL}/Minimalist%20Bathroom%20Scene.png`,
        `${SUPABASE_URL}/Monochromatic%20Staircase%20Scene.png`,
      ],
      category: 'web',
      tags: ['Productivity', 'SaaS', 'Collaboration'],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
      year: 2025,
      client: 'FlowHQ',
      role: 'Lead Product Designer',
      duration: '4 months',
      status: 'completed',
      featured: true,
      order: 1,
      challenge: 'They needed a tool that felt effortless to use, without the clutter and learning curve of traditional project management software.',
      approachBullets: [
        'Designed an ultra-minimal interface that puts tasks front and center',
        'Built smart automation that learns team patterns and reduces busy work',
        'Created fluid animations that make the app feel alive and responsive',
      ],
      valueDelivered: [
        { label: 'Faster task completion', value: '3x' },
        { label: 'Boost in team productivity', value: '40%' },
        { label: 'User satisfaction rating', value: '4.9/5' },
      ],
      testimonial: {
        quote: "Flow feels like magic. It's the first productivity tool that actually makes us more productive instead of just tracking our work.",
        author: 'Sarah Chen',
        role: 'Product Lead at FlowHQ',
      },
      relevanceNote: "I love building tools that get out of your way and help you do your best work. If you're looking to create software that people actually enjoy using, let's talk.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Bloom',
      description: 'A wellness platform that makes mental health support accessible and approachable for everyone',
      image: `${SUPABASE_URL}/Contemplative%20Portrait.png`,
      images: [
        `${SUPABASE_URL}/Contemplative%20Portrait.png`,
        `${SUPABASE_URL}/Cozy%20Nightstand%20Setup.png`,
        `${SUPABASE_URL}/Man%20in%20Warm%20Office.png`,
        `${SUPABASE_URL}/Contemplative%20Silhouette%20in%20Orange.png`,
      ],
      category: 'mobile',
      tags: ['Health', 'Wellness', 'Mobile App'],
      technologies: ['React Native', 'Firebase', 'Node.js', 'Stripe', 'Figma'],
      year: 2025,
      client: 'Bloom Health',
      role: 'Product Designer & Strategist',
      duration: '5 months',
      status: 'completed',
      featured: true,
      order: 2,
      challenge: 'Mental health apps often feel clinical and intimidating, making it hard for people to take the first step toward getting help.',
      approachBullets: [
        'Created warm, inviting visuals that feel like a supportive friend rather than a medical tool',
        'Simplified the onboarding flow to get users to their first session in under 2 minutes',
        'Designed privacy-first features that help users feel safe and in control',
      ],
      valueDelivered: [
        { label: 'Increase in user signups', value: '65%' },
        { label: 'Users completed first session', value: '85%' },
        { label: 'Return for follow-ups', value: '72%' },
      ],
      testimonial: {
        quote: "The design made me feel comfortable reaching out for help. It doesn't feel like therapy—it feels like self-care.",
        author: 'Michael Torres',
        role: 'Beta User',
      },
      relevanceNote: "I'm passionate about designing experiences that break down barriers and make important services more human. If that resonates with you, I'd love to collaborate.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Spark',
      description: 'An e-commerce platform that turns casual browsers into loyal customers through personalized shopping experiences',
      image: `${SUPABASE_URL}/Modern%20Editorial%20Portrait.png`,
      images: [
        `${SUPABASE_URL}/Modern%20Editorial%20Portrait.png`,
        `${SUPABASE_URL}/Modern%20Lipstick%20Display.png`,
        `${SUPABASE_URL}/Stylish%20Cap%20Close-Up.png`,
        `${SUPABASE_URL}/Abstract%20Portrait.png`,
      ],
      category: 'web',
      tags: ['E-commerce', 'Retail', 'Personalization'],
      technologies: ['Next.js', 'Shopify', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      year: 2024,
      client: 'Spark Retail',
      role: 'UX Designer & Developer',
      duration: '3 months',
      status: 'completed',
      featured: true,
      order: 3,
      challenge: 'Their online store had traffic but low conversion rates—people were browsing but not buying.',
      approachBullets: [
        'Redesigned the product pages to highlight benefits over features',
        'Added smart recommendations that feel personal, not creepy',
        'Streamlined checkout to remove friction and boost confidence',
      ],
      valueDelivered: [
        { label: 'Jump in conversion rate', value: '2.3x' },
        { label: 'Higher average order value', value: '+45%' },
        { label: 'Reduction in cart abandonment', value: '38%' },
      ],
      testimonial: {
        quote: 'Our customers love the new experience. Sales doubled within the first month, and the feedback has been incredible.',
        author: 'Jessica Park',
        role: 'Founder, Spark Retail',
      },
      relevanceNote: "I specialize in turning good products into great experiences that drive real business results. If you're ready to grow, let's connect.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};
