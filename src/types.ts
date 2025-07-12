export interface SiteLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  icon: string;
  createdAt: Date;
  isActive: boolean;
  status: 'online' | 'offline' | 'maintenance';
  lastChecked?: Date;
  responseTime?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}