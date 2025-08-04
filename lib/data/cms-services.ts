// CMS Services Data Store - Controls Public Website Content
import { Service } from '@/lib/types/admin';

// This data powers BOTH the admin panel AND the public website
export let servicesData: Service[] = [
  {
    id: '1',
    name: 'Video Editing',
    description: 'High-impact video content designed to convert and retain viewers with professional editing techniques.',
    category: 'editing',
    pricing: {
      starter: 500,
      pro: 1200,
      custom: 2500
    },
    features: [
      'Iman Gadzhi-Style Edits (fast cuts, kinetic text, captions)',
      'Short-Form Reels/TikToks',
      'YouTube Video Editing',
      'Testimonial & Case Study Videos',
      'Repurposed Content (long-form to short-form)',
      'Color Grading & Audio Enhancement',
      'Motion Graphics & Transitions',
      'Retention Optimization'
    ],
    isVisible: true,
    demand: 85,
    completionRate: 96,
    averageRating: 4.8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    iconUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=400&fit=crop&auto=format',
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop&auto=format',
    subServices: [
      'Iman Gadzhi-Style Edits',
      'Short-Form Reels/TikToks', 
      'YouTube Video Editing',
      'Testimonial Videos',
      'Repurposed Content'
    ]
  },
  {
    id: '2',
    name: 'Graphic Design',
    description: 'Visual storytelling that sticks with professional branding and design solutions.',
    category: 'design',
    pricing: {
      starter: 300,
      pro: 800,
      custom: 1800
    },
    features: [
      'Album Artwork & Cover Design',
      'Branding & Brand Identity (logo, color, typography)',
      'Social Media Designs (carousels, banners, ads)',
      'Merch Design & Print-Ready Files',
      'Style Guides & Creative Direction',
      'Thumbnail Design & CTR Optimization',
      'Business Card & Stationery Design',
      'Web Graphics & UI Elements'
    ],
    isVisible: true,
    demand: 78,
    completionRate: 94,
    averageRating: 4.7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    iconUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop&auto=format',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&auto=format',
    subServices: [
      'Album Artwork & Cover Design',
      'Branding & Brand Identity',
      'Social Media Designs',
      'Merch Design',
      'Style Guides'
    ]
  },
  {
    id: '3',
    name: 'AI Automation',
    description: 'Let machines handle what drains your time with smart automation solutions.',
    category: 'automation',
    pricing: {
      starter: 800,
      pro: 2000,
      custom: 5000
    },
    features: [
      'AI Workflow Automation (Zapier, Make, N8N)',
      'AI Chatbots (GPT-powered sales/support bots)',
      'AI Voice Agents (phone-based reps)',
      'CRM Assistants & Lead Routing Tools',
      'Smart Review Triggers & Auto-Email Systems',
      'AI-Powered Email Nurturing Systems',
      'Process Automation & Integration',
      'Custom AI Solutions'
    ],
    isVisible: true,
    demand: 92,
    completionRate: 89,
    averageRating: 4.9,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    iconUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop&auto=format',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format',
    subServices: [
      'AI Workflow Automation',
      'AI Chatbots',
      'AI Voice Agents',
      'CRM Assistants',
      'Email Automation'
    ]
  },
  {
    id: '4',
    name: 'Website Development & Design',
    description: 'Web experiences that convert, load fast, and reflect your brand perfectly.',
    category: 'development',
    pricing: {
      starter: 1200,
      pro: 3500,
      custom: 8000
    },
    features: [
      'Shopify Stores (product-focused & conversion optimized)',
      'Wix Builds (rapid prototyping & launch)',
      'E-Commerce Sites (WooCommerce, Shopify)',
      'Webflow Sites (CMS + high-design)',
      'WordPress Builds (custom themes & plugins)',
      'Custom-Coded Websites (React, Next.js)',
      'Mobile Optimization & Performance',
      'SEO Integration & Analytics'
    ],
    isVisible: true,
    demand: 73,
    completionRate: 91,
    averageRating: 4.6,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    iconUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=400&fit=crop&auto=format',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
    subServices: [
      'Shopify Stores',
      'E-Commerce Sites',
      'Webflow Sites',
      'WordPress Builds',
      'Custom-Coded Websites'
    ]
  }
];

// CMS Functions to manage services data
export const updateService = (id: string, updatedService: Partial<Service>) => {
  const index = servicesData.findIndex(service => service.id === id);
  if (index !== -1) {
    servicesData[index] = {
      ...servicesData[index],
      ...updatedService,
      updatedAt: new Date().toISOString()
    };
  }
  return servicesData[index];
};

export const addService = (newService: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
  const service: Service = {
    ...newService,
    id: (servicesData.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  servicesData.push(service);
  return service;
};

export const deleteService = (id: string) => {
  const index = servicesData.findIndex(service => service.id === id);
  if (index !== -1) {
    const deletedService = servicesData[index];
    servicesData.splice(index, 1);
    return deletedService;
  }
  return null;
};

export const toggleServiceVisibility = (id: string) => {
  const service = servicesData.find(s => s.id === id);
  if (service) {
    service.isVisible = !service.isVisible;
    service.updatedAt = new Date().toISOString();
  }
  return service;
};

export const getVisibleServices = () => {
  return servicesData.filter(service => service.isVisible);
};

export const getServiceById = (id: string) => {
  return servicesData.find(service => service.id === id);
};

export const getServicesByCategory = (category: Service['category']) => {
  return servicesData.filter(service => service.category === category);
};

export const updateServicePricing = (id: string, pricing: Service['pricing']) => {
  const service = servicesData.find(s => s.id === id);
  if (service) {
    service.pricing = pricing;
    service.updatedAt = new Date().toISOString();
  }
  return service;
};

export const uploadServiceImage = (id: string, imageType: 'iconUrl' | 'imageUrl', imageUrl: string) => {
  const service = servicesData.find(s => s.id === id);
  if (service) {
    service[imageType] = imageUrl;
    service.updatedAt = new Date().toISOString();
  }
  return service;
};

// Utility functions for CMS
export const getServiceStats = () => {
  return {
    totalServices: servicesData.length,
    visibleServices: servicesData.filter(s => s.isVisible).length,
    hiddenServices: servicesData.filter(s => !s.isVisible).length,
    averageDemand: Math.round(servicesData.reduce((sum, s) => sum + s.demand, 0) / servicesData.length),
    totalRevenue: servicesData.reduce((sum, s) => sum + s.pricing.pro, 0),
    topPerformingService: servicesData.reduce((top, current) => 
      current.demand > top.demand ? current : top, servicesData[0]
    )
  };
};

export const exportServicesData = () => {
  return JSON.stringify(servicesData, null, 2);
};

export const importServicesData = (jsonData: string) => {
  try {
    const importedServices = JSON.parse(jsonData);
    if (Array.isArray(importedServices)) {
      servicesData = importedServices;
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to import services data:', error);
    return false;
  }
};