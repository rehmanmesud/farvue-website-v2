// Comprehensive Projects Data & Utilities
import { Project, Client, User, ProjectDeliverable, ProjectRevision, ProjectStats } from '@/lib/types/admin';

// Mock Team Members
export const mockTeamMembers: User[] = [
  {
    id: '1',
    name: 'Rehmanmesud',
    email: 'rehman@farvue.media',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
    role: 'Admin',
    skills: ['Creative Direction', 'Content Strategy', 'After Effects', 'Premiere Pro'],
    isActive: true
  },
  {
    id: '2',
    name: 'Fazal Mesud',
    email: 'fazal@farvue.media',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
    role: 'Designer',
    skills: ['Photoshop', 'Illustrator', 'Figma', 'Visual Branding'],
    isActive: true
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@farvue.media',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face&auto=format',
    role: 'Editor',
    skills: ['Video Editing', 'Motion Graphics', 'Sound Design', 'Color Grading'],
    isActive: true
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael@farvue.media',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
    role: 'Editor',
    skills: ['React', 'Next.js', 'Node.js', 'UI/UX Design'],
    isActive: true
  }
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechReviewer Pro',
    email: 'contact@techreviewerpro.com',
    company: 'TechReviewer Channel',
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&auto=format',
    phone: '+1 (555) 123-4567',
    socialHandles: {
      youtube: '@techreviewerpro',
      instagram: '@techreviewerpro',
      linkedin: 'techreviewerpro'
    },
    preferences: {
      platforms: ['YouTube', 'Instagram'],
      styleReferences: ['Tech', 'Modern', 'Clean'],
      communicationPreference: 'email'
    },
    totalProjects: 12,
    totalRevenue: 25400,
    status: 'active',
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'FitnessPro Influencer',
    email: 'hello@fitnesspro.com',
    company: 'FitnessPro',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face&auto=format',
    socialHandles: {
      instagram: '@fitnesspro',
      tiktok: '@fitnesspro',
      youtube: '@fitnesspro'
    },
    preferences: {
      platforms: ['Instagram', 'TikTok'],
      styleReferences: ['Fitness', 'Energetic', 'Bold'],
      communicationPreference: 'slack'
    },
    totalProjects: 8,
    totalRevenue: 18200,
    status: 'active',
    joinedDate: '2024-02-20'
  }
];

// Mock Deliverables
const mockDeliverables: ProjectDeliverable[] = [
  {
    id: 'd1',
    name: 'Final_Video_V3.mp4',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop&auto=format',
    fileSize: 125000000,
    uploadedAt: '2025-01-08T10:30:00Z',
    uploadedBy: '1'
  },
  {
    id: 'd2',
    name: 'Thumbnail_Options.zip',
    type: 'image',
    url: 'https://example.com/thumbnails.zip',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=225&fit=crop&auto=format',
    fileSize: 5000000,
    uploadedAt: '2025-01-07T14:20:00Z',
    uploadedBy: '2'
  }
];

// Mock Revisions
const mockRevisions: ProjectRevision[] = [
  {
    id: 'r1',
    version: 1,
    description: 'Initial draft with basic editing and color correction',
    status: 'approved',
    clientNotes: 'Great start! Can we add more motion graphics in the intro?',
    createdAt: '2025-01-05T09:00:00Z',
    createdBy: '3',
    deliverables: [mockDeliverables[0]]
  },
  {
    id: 'r2',
    version: 2,
    description: 'Added motion graphics and improved transitions',
    status: 'in-review',
    clientNotes: 'Much better! Just need to adjust the audio levels in the middle section.',
    createdAt: '2025-01-08T15:30:00Z',
    createdBy: '3',
    deliverables: [mockDeliverables[0], mockDeliverables[1]]
  }
];

// Mock Projects Data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'High-Retention YouTube Video Editing - Tech Reviews Q1',
    description: 'Complete video editing package with advanced motion graphics, color grading, and viral-style cuts for tech review content. Focus on retention optimization and subscriber growth.',
    client: mockClients[0],
    assignedTeam: [mockTeamMembers[0], mockTeamMembers[2]],
    serviceType: 'video-editing',
    status: 'in-progress',
    priority: 'high',
    budget: 3500,
    estimatedHours: 45,
    actualHours: 32,
    startDate: '2025-01-01',
    dueDate: '2025-01-15',
    progress: 75,
    tags: ['YouTube', 'Tech Reviews', 'Long Form', 'Motion Graphics', 'High Priority'],
    deliverables: mockDeliverables,
    revisions: mockRevisions,
    clientNotes: 'Need to maintain consistent branding across all videos. Focus on the first 15 seconds for hook optimization.',
    internalNotes: 'Client prefers quick cuts and modern transitions. Has specific color palette requirements.',
    createdAt: '2024-12-28T08:00:00Z',
    updatedAt: '2025-01-08T16:45:00Z',
    createdBy: '1'
  },
  {
    id: '2',
    title: 'Instagram Reels Content Package - Fitness Series',
    description: 'Monthly package of 25 Instagram reels with trending effects, quick cuts, and engaging visuals for fitness content targeting millennial audience.',
    client: mockClients[1],
    assignedTeam: [mockTeamMembers[1], mockTeamMembers[3]],
    serviceType: 'short-form',
    status: 'in-review',
    priority: 'medium',
    budget: 2200,
    estimatedHours: 30,
    actualHours: 28,
    startDate: '2025-01-05',
    dueDate: '2025-01-20',
    progress: 90,
    tags: ['Instagram', 'Reels', 'Fitness', 'Trending', 'Social Media'],
    deliverables: [],
    revisions: [],
    clientNotes: 'Love the energy! Can we test some different music options for better engagement?',
    internalNotes: 'Client is very responsive and easy to work with. Prefers bold, energetic style.',
    createdAt: '2025-01-02T10:15:00Z',
    updatedAt: '2025-01-08T11:20:00Z',
    createdBy: '1'
  },
  {
    id: '3',
    title: 'Brand Thumbnail Design System - Business Channel',
    description: 'Comprehensive thumbnail design system with consistent branding, high CTR optimization, and A/B testing variations for business content.',
    client: {
      id: '3',
      name: 'Business Growth Channel',
      email: 'team@businessgrowth.com',
      company: 'Business Growth Media',
      socialHandles: {
        youtube: '@businessgrowth',
        linkedin: 'businessgrowth'
      },
      preferences: {
        platforms: ['YouTube', 'LinkedIn'],
        styleReferences: ['Professional', 'Clean', 'Corporate'],
        communicationPreference: 'email'
      },
      totalProjects: 5,
      totalRevenue: 8900,
      status: 'active',
      joinedDate: '2024-11-10'
    },
    assignedTeam: [mockTeamMembers[1]],
    serviceType: 'design',
    status: 'completed',
    priority: 'low',
    budget: 1500,
    estimatedHours: 20,
    actualHours: 18,
    startDate: '2024-12-20',
    dueDate: '2025-01-10',
    completedDate: '2025-01-09',
    progress: 100,
    tags: ['Thumbnails', 'Branding', 'CTR Optimization', 'Business', 'YouTube'],
    deliverables: [],
    revisions: [],
    clientNotes: 'Exactly what we needed! The CTR improved by 35% with the new designs.',
    internalNotes: 'Client was very specific about brand guidelines. Project completed ahead of schedule.',
    createdAt: '2024-12-18T14:30:00Z',
    updatedAt: '2025-01-09T17:00:00Z',
    createdBy: '1'
  },
  {
    id: '4',
    title: 'E-commerce Website Development - Fashion Startup',
    description: 'Custom Shopify store development with modern design, mobile optimization, conversion-focused landing pages, and payment gateway integration.',
    client: {
      id: '4',
      name: 'Fashion Forward Startup',
      email: 'dev@fashionforward.com',
      company: 'Fashion Forward',
      socialHandles: {
        instagram: '@fashionforward',
        tiktok: '@fashionfwd'
      },
      preferences: {
        platforms: ['Instagram', 'TikTok', 'Web'],
        styleReferences: ['Modern', 'Minimal', 'Fashion'],
        communicationPreference: 'slack'
      },
      totalProjects: 2,
      totalRevenue: 12000,
      status: 'active',
      joinedDate: '2024-12-01'
    },
    assignedTeam: [mockTeamMembers[3], mockTeamMembers[0]],
    serviceType: 'web-development',
    status: 'in-progress',
    priority: 'high',
    budget: 6500,
    estimatedHours: 80,
    actualHours: 35,
    startDate: '2024-12-15',
    dueDate: '2025-01-25',
    progress: 45,
    tags: ['Shopify', 'E-commerce', 'Fashion', 'Mobile Optimization', 'Conversion'],
    deliverables: [],
    revisions: [],
    clientNotes: 'Need to ensure mobile experience is perfect. Primary audience is mobile users aged 18-35.',
    internalNotes: 'Complex project with custom functionality requirements. Regular check-ins scheduled.',
    createdAt: '2024-12-12T09:00:00Z',
    updatedAt: '2025-01-08T13:15:00Z',
    createdBy: '1'
  },
  {
    id: '5',
    title: 'AI Chatbot Integration - SaaS Platform',
    description: 'GPT-powered customer support chatbot with CRM integration, automated lead routing, and advanced conversation analytics.',
    client: {
      id: '5',
      name: 'SaaS Solutions Inc',
      email: 'tech@saassolutions.com',
      company: 'SaaS Solutions',
      socialHandles: {
        linkedin: 'saassolutions'
      },
      preferences: {
        platforms: ['Web', 'Slack'],
        styleReferences: ['Technical', 'Professional'],
        communicationPreference: 'email'
      },
      totalProjects: 3,
      totalRevenue: 15600,
      status: 'active',
      joinedDate: '2024-10-05'
    },
    assignedTeam: [mockTeamMembers[3]],
    serviceType: 'ai-automation',
    status: 'not-started',
    priority: 'medium',
    budget: 4200,
    estimatedHours: 60,
    actualHours: 0,
    startDate: '2025-01-15',
    dueDate: '2025-02-15',
    progress: 5,
    tags: ['AI', 'Chatbot', 'SaaS', 'CRM Integration', 'Automation'],
    deliverables: [],
    revisions: [],
    clientNotes: 'Integration needs to be seamless with existing Salesforce setup. Security is paramount.',
    internalNotes: 'Complex technical requirements. Need to schedule discovery call before starting.',
    createdAt: '2025-01-02T16:20:00Z',
    updatedAt: '2025-01-08T09:30:00Z',
    createdBy: '1'
  }
];

// Mock Project Statistics
export const mockProjectStats: ProjectStats = {
  totalProjects: mockProjects.length,
  activeProjects: mockProjects.filter(p => ['in-progress', 'in-review'].includes(p.status)).length,
  completedProjects: mockProjects.filter(p => p.status === 'completed').length,
  overdueProjects: mockProjects.filter(p => new Date(p.dueDate) < new Date() && p.status !== 'completed').length,
  totalRevenue: mockProjects.reduce((sum, p) => sum + p.budget, 0),
  averageCompletionTime: 18.5, // days
  clientSatisfactionRate: 94.5 // percentage
};

// Utility Functions
export const getProjectsByStatus = (status: Project['status']) => {
  return mockProjects.filter(project => project.status === status);
};

export const getProjectsByClient = (clientId: string) => {
  return mockProjects.filter(project => project.client.id === clientId);
};

export const getProjectsByTeamMember = (userId: string) => {
  return mockProjects.filter(project => 
    project.assignedTeam.some(member => member.id === userId)
  );
};

export const getOverdueProjects = () => {
  return mockProjects.filter(project => 
    new Date(project.dueDate) < new Date() && project.status !== 'completed'
  );
};

export const calculateProjectProgress = (project: Project) => {
  // Complex logic to calculate progress based on deliverables, revisions, etc.
  const statusWeight = {
    'not-started': 0,
    'in-progress': 50,
    'in-review': 80,
    'revision': 65,
    'completed': 100,
    'on-hold': project.progress,
    'cancelled': 0
  };
  
  return statusWeight[project.status] || project.progress;
};

export const getProjectStatusColor = (status: Project['status']) => {
  const colors = {
    'not-started': 'bg-gray-100 text-gray-800 border-gray-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'in-review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'revision': 'bg-orange-100 text-orange-800 border-orange-200',
    'completed': 'bg-green-100 text-green-800 border-green-200',
    'on-hold': 'bg-purple-100 text-purple-800 border-purple-200',
    'cancelled': 'bg-red-100 text-red-800 border-red-200'
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getPriorityColor = (priority: Project['priority']) => {
  const colors = {
    'low': 'text-green-600',
    'medium': 'text-yellow-600',
    'high': 'text-orange-600',
    'urgent': 'text-red-600'
  };
  
  return colors[priority] || 'text-gray-600';
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatFileSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const exportProjectsToCSV = (projects: Project[]) => {
  const headers = [
    'ID', 'Title', 'Client', 'Status', 'Priority', 'Budget', 'Progress', 
    'Start Date', 'Due Date', 'Assigned Team', 'Service Type'
  ];
  
  const csvContent = [
    headers.join(','),
    ...projects.map(project => [
      project.id,
      `"${project.title}"`,
      `"${project.client.name}"`,
      project.status,
      project.priority,
      project.budget,
      `${project.progress}%`,
      project.startDate,
      project.dueDate,
      `"${project.assignedTeam.map(t => t.name).join(', ')}"`,
      project.serviceType
    ].join(','))
  ].join('\n');
  
  return csvContent;
};