export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'rep' | 'manager' | 'admin';
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified';
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  value: number;
  stage: 'Discovery' | 'Proposal' | 'Won' | 'Lost';
  ownerId: string;
  leadId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'rep' | 'manager' | 'admin';
}

export interface DashboardStats {
  totalLeads: number;
  totalOpportunities: number;
  totalValue: number;
  leadsByStatus: { status: string; count: number }[];
  opportunitiesByStage: { stage: string; count: number; value: number }[];
}