// Admin Panel Type Definitions
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Editor' | 'Designer' | 'Viewer';
  skills: string[];
  isActive: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
  phone?: string;
  socialHandles: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
  };
  preferences: {
    platforms: string[];
    styleReferences: string[];
    communicationPreference: 'email' | 'slack' | 'phone';
  };
  totalProjects: number;
  totalRevenue: number;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
}

export interface ProjectDeliverable {
  id: string;
  name: string;
  type: 'video' | 'image' | 'thumbnail' | 'document';
  url: string;
  thumbnailUrl?: string;
  fileSize: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ProjectRevision {
  id: string;
  version: number;
  description: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  clientNotes: string;
  createdAt: string;
  createdBy: string;
  deliverables: ProjectDeliverable[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  client: Client;
  assignedTeam: User[];
  serviceType: 'video-editing' | 'short-form' | 'design' | 'web-development' | 'ai-automation';
  status: 'not-started' | 'in-progress' | 'in-review' | 'revision' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  estimatedHours: number;
  actualHours: number;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  progress: number;
  tags: string[];
  deliverables: ProjectDeliverable[];
  revisions: ProjectRevision[];
  clientNotes: string;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ProjectFilter {
  status?: Project['status'][];
  serviceType?: Project['serviceType'][];
  priority?: Project['priority'][];
  assignedTeam?: string[];
  client?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueProjects: number;
  totalRevenue: number;
  averageCompletionTime: number;
  clientSatisfactionRate: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'editing' | 'design' | 'development' | 'automation';
  pricing: {
    starter: number;
    pro: number;
    custom?: number;
  };
  features: string[];
  isVisible: boolean;
  demand: number;
  completionRate: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  iconUrl?: string;
  imageUrl?: string;
  subServices?: string[];
}

export interface Analytics {
  monthlyRevenue: number[];
  clientGrowth: number[];
  completionRate: number;
  topServices: { name: string; revenue: number; projects: number }[];
  retentionMetrics: {
    newClients: number;
    returningClients: number;
    churnRate: number;
  };
  trafficSources: { source: string; visitors: number; conversions: number }[];
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  thumbnailUrl?: string;
  fileSize: number;
  tags: string[];
  projects: string[];
  clients: string[];
  services: string[];
  uploadedAt: string;
  uploadedBy: string;
}

export interface Settings {
  branding: {
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
    keywords: string[];
  };
  integrations: {
    calendly?: string;
    stripe?: string;
    notion?: string;
    slack?: string;
    googleAnalytics?: string;
  };
  notifications: {
    email: boolean;
    slack: boolean;
    push: boolean;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
    website?: string;
  };
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamSettings {
  sectionLabel: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  showStats: boolean;
  isVisible: boolean;
}