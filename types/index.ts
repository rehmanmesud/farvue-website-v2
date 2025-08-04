export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  buttonClass: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'longform' | 'shortform' | 'thumbnails';
  type: string;
  thumbnail: string;
  before?: string;
  after?: string;
  stats: string;
  description: string;
}

export interface Testimonial {
  id: number;
  client: string;
  content: string;
  rating: number;
  videoThumbnail: string;
}

export interface Client {
  name: string;
  role?: string;
  followers?: string;
  avatar: string;
}

export interface Service {
  title: string;
  description: string;
  features: string[];
  gradient: string;
  iconColor: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SocialLink {
  name: string;
  href: string;
  color: string;
}

export interface FooterSection {
  title: string;
  links: Array<{
    name: string;
    href?: string;
    action?: () => void;
  }>;
}

export interface NavigationItem {
  name: string;
  href: string;
}

// Component Props Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  padding?: boolean;
}