export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'website' | 'mobile' | 'growth' | 'custom';
  metric: string;
  features: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  isPopular?: boolean;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  deliveryTime: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  impactMetric: string;
  impactLabel: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  iconType: 'discuss' | 'design' | 'develop' | 'launch';
  deliverables: string[];
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  context: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  outcome: string;
}

export interface EnquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  selectedPlan: string;
  timeline: string;
  projectBrief: string;
}
