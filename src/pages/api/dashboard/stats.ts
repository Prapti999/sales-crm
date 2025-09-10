import { NextApiRequest, NextApiResponse } from 'next';
import { getLeads, getOpportunities } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { DashboardStats } from '@/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const leads = getLeads();
    const opportunities = getOpportunities();

    // Filter data based on user role
    const filteredLeads = user.role === 'rep' 
      ? leads.filter(lead => lead.ownerId === user.id)
      : leads;

    const filteredOpportunities = user.role === 'rep' 
      ? opportunities.filter(opp => opp.ownerId === user.id)
      : opportunities;

    // Calculate stats
    const totalLeads = filteredLeads.length;
    const totalOpportunities = filteredOpportunities.length;
    const totalValue = filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0);

    // Group leads by status
    const leadsByStatus = ['New', 'Contacted', 'Qualified'].map(status => ({
      status,
      count: filteredLeads.filter(lead => lead.status === status).length,
    }));

    // Group opportunities by stage
    const opportunitiesByStage = ['Discovery', 'Proposal', 'Won', 'Lost'].map(stage => ({
      stage,
      count: filteredOpportunities.filter(opp => opp.stage === stage).length,
      value: filteredOpportunities
        .filter(opp => opp.stage === stage)
        .reduce((sum, opp) => sum + opp.value, 0),
    }));

    const stats: DashboardStats = {
      totalLeads,
      totalOpportunities,
      totalValue,
      leadsByStatus,
      opportunitiesByStage,
    };

    res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}