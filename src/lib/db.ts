import fs from 'fs';
import path from 'path';
import { User, Lead, Opportunity } from '@/types';

const DB_PATH = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DB_PATH, 'users.json');
const LEADS_FILE = path.join(DB_PATH, 'leads.json');
const OPPORTUNITIES_FILE = path.join(DB_PATH, 'opportunities.json');

// Ensure data directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize files with default data if they don't exist
const initializeFiles = () => {
  if (!fs.existsSync(USERS_FILE)) {
    const defaultUsers: User[] = [
      {
        id: 'u1',
        name: 'Admin User',
        email: 'admin@demo.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'u2',
        name: 'Sales Manager',
        email: 'manager@demo.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password
        role: 'manager',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'u3',
        name: 'Sales Rep',
        email: 'rep@demo.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password
        role: 'rep',
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
  }

  if (!fs.existsSync(LEADS_FILE)) {
    const defaultLeads: Lead[] = [
      {
        id: 'l1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0101',
        status: 'New',
        ownerId: 'u3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'l2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-0102',
        status: 'Contacted',
        ownerId: 'u3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'l3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '555-0103',
        status: 'Qualified',
        ownerId: 'u2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(LEADS_FILE, JSON.stringify(defaultLeads, null, 2));
  }

  if (!fs.existsSync(OPPORTUNITIES_FILE)) {
    const defaultOpportunities: Opportunity[] = [
      {
        id: 'o1',
        title: 'Enterprise Software Deal',
        value: 50000,
        stage: 'Discovery',
        ownerId: 'u3',
        leadId: 'l3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'o2',
        title: 'Consulting Services',
        value: 25000,
        stage: 'Proposal',
        ownerId: 'u2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(OPPORTUNITIES_FILE, JSON.stringify(defaultOpportunities, null, 2));
  }
};

// Database operations
export const getUsers = (): User[] => {
  initializeFiles();
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(data);
};

export const saveUsers = (users: User[]): void => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

export const getLeads = (): Lead[] => {
  initializeFiles();
  const data = fs.readFileSync(LEADS_FILE, 'utf8');
  return JSON.parse(data);
};

export const saveLeads = (leads: Lead[]): void => {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
};

export const getOpportunities = (): Opportunity[] => {
  initializeFiles();
  const data = fs.readFileSync(OPPORTUNITIES_FILE, 'utf8');
  return JSON.parse(data);
};

export const saveOpportunities = (opportunities: Opportunity[]): void => {
  fs.writeFileSync(OPPORTUNITIES_FILE, JSON.stringify(opportunities, null, 2));
};

export const generateId = (prefix: string): string => {
  return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};