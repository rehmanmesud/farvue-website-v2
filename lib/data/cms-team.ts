// CMS Team Data Store - Controls Team Section Content
import { TeamMember, TeamSettings } from '@/lib/types/admin';

// Storage key for localStorage persistence
const TEAM_STORAGE_KEY = 'farvue_cms_team';
const TEAM_SETTINGS_STORAGE_KEY = 'farvue_cms_team_settings';

// Default team settings
const defaultTeamSettings: TeamSettings = {
  sectionLabel: 'DUO',
  heading: 'Meet the incredible duo.',
  description: 'We pride ourselves of being the best of the best and we encapsulates that.',
  buttonText: 'Book a 30-min call →',
  buttonUrl: 'https://calendly.com/farvuemedia',
  showStats: true,
  isVisible: true
};

// Default team members data
const defaultTeamData: TeamMember[] = [
  {
    id: '1',
    name: 'Rehmanmesud',
    role: 'Founder & Lead Strategist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format',
    bio: 'Founder of FARVUE Media. With a deep passion for storytelling and over 3 years of creative leadership, Rehman helps creators scale with strategy-backed, high-retention video content.',
    skills: ['Creative Direction', 'Content Strategy', 'After Effects', 'Premiere Pro'],
    social: {
      linkedin: 'https://linkedin.com/in/rehmanmesud',
      twitter: 'https://twitter.com/rehmanmesud',
      instagram: 'https://instagram.com/rehmanmesud'
    },
    order: 1,
    isVisible: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z'
  },
  {
    id: '2',
    name: 'Fazal Mesud',
    role: 'Co-Founder & Design Head',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format',
    bio: 'Co-founder of FARVUE Media. Fazal blends creativity and psychology to craft thumbnails and visuals that stop the scroll and elevate creator brands.',
    skills: ['Photoshop', 'Illustrator', 'Figma', 'Visual Branding'],
    social: {
      linkedin: 'https://linkedin.com/in/fazalmesud',
      twitter: 'https://twitter.com/fazalmesud',
      instagram: 'https://instagram.com/fazalmesud'
    },
    order: 2,
    isVisible: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z'
  }
];

// localStorage persistence functions
const saveTeamToStorage = (data: TeamMember[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save team data to localStorage:', error);
    }
  }
};

const saveTeamSettingsToStorage = (settings: TeamSettings) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(TEAM_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save team settings to localStorage:', error);
    }
  }
};

const loadTeamFromStorage = (): TeamMember[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(TEAM_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load team data from localStorage:', error);
    }
  }
  return defaultTeamData;
};

const loadTeamSettingsFromStorage = (): TeamSettings => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(TEAM_SETTINGS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load team settings from localStorage:', error);
    }
  }
  return defaultTeamSettings;
};

// Initialize data
export let teamData: TeamMember[] = loadTeamFromStorage();
export let teamSettings: TeamSettings = loadTeamSettingsFromStorage();

// Get current data functions
export const getTeamData = (): TeamMember[] => {
  teamData = loadTeamFromStorage();
  return teamData.filter(member => member.isVisible).sort((a, b) => a.order - b.order);
};

export const getTeamSettings = (): TeamSettings => {
  teamSettings = loadTeamSettingsFromStorage();
  return teamSettings;
};

export const getAllTeamMembers = (): TeamMember[] => {
  teamData = loadTeamFromStorage();
  return teamData.sort((a, b) => a.order - b.order);
};

// Team member CRUD operations
export const addTeamMember = (newMember: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => {
  teamData = loadTeamFromStorage();
  const member: TeamMember = {
    ...newMember,
    id: (Date.now()).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  teamData.push(member);
  saveTeamToStorage(teamData);
  return member;
};

export const updateTeamMember = (id: string, updatedMember: Partial<TeamMember>) => {
  teamData = loadTeamFromStorage();
  const index = teamData.findIndex(member => member.id === id);
  if (index !== -1) {
    teamData[index] = {
      ...teamData[index],
      ...updatedMember,
      updatedAt: new Date().toISOString()
    };
    saveTeamToStorage(teamData);
  }
  return teamData[index];
};

export const deleteTeamMember = (id: string) => {
  teamData = loadTeamFromStorage();
  const index = teamData.findIndex(member => member.id === id);
  if (index !== -1) {
    const deletedMember = teamData[index];
    teamData.splice(index, 1);
    saveTeamToStorage(teamData);
    return deletedMember;
  }
  return null;
};

export const toggleTeamMemberVisibility = (id: string) => {
  teamData = loadTeamFromStorage();
  const member = teamData.find(m => m.id === id);
  if (member) {
    member.isVisible = !member.isVisible;
    member.updatedAt = new Date().toISOString();
    saveTeamToStorage(teamData);
  }
  return member;
};

export const updateTeamMemberOrder = (id: string, newOrder: number) => {
  teamData = loadTeamFromStorage();
  const member = teamData.find(m => m.id === id);
  if (member) {
    member.order = newOrder;
    member.updatedAt = new Date().toISOString();
    saveTeamToStorage(teamData);
  }
  return member;
};

// Team settings operations
export const updateTeamSettings = (newSettings: Partial<TeamSettings>) => {
  teamSettings = loadTeamSettingsFromStorage();
  teamSettings = {
    ...teamSettings,
    ...newSettings
  };
  saveTeamSettingsToStorage(teamSettings);
  return teamSettings;
};

// Utility functions
export const getTeamStats = () => {
  teamData = loadTeamFromStorage();
  return {
    totalMembers: teamData.length,
    visibleMembers: teamData.filter(m => m.isVisible).length,
    hiddenMembers: teamData.filter(m => !m.isVisible).length
  };
};

export const exportTeamData = () => {
  return JSON.stringify({
    members: loadTeamFromStorage(),
    settings: loadTeamSettingsFromStorage()
  }, null, 2);
};

export const importTeamData = (jsonData: string) => {
  try {
    const importedData = JSON.parse(jsonData);
    if (importedData.members && Array.isArray(importedData.members)) {
      teamData = importedData.members;
      saveTeamToStorage(teamData);
    }
    if (importedData.settings) {
      teamSettings = importedData.settings;
      saveTeamSettingsToStorage(teamSettings);
    }
    return true;
  } catch (error) {
    console.error('Failed to import team data:', error);
    return false;
  }
};

// Refresh function
export const refreshTeamData = () => {
  teamData = loadTeamFromStorage();
  teamSettings = loadTeamSettingsFromStorage();
  return { members: teamData, settings: teamSettings };
};