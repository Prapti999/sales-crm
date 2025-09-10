import { NextApiRequest, NextApiResponse } from 'next';
import { getLeads, saveLeads, getOpportunities, saveOpportunities, generateId } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
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
    const { title, value } = req.body;

    if (!title || !value) {
      return res.status(400).json({ message: 'Title and value are required' });
    }

    const leads = getLeads();
    const leadIndex = leads.findIndex(lead => lead.id === id);

    if (leadIndex === -1) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const lead = leads[leadIndex];

    // Check permissions
    if (user.role === 'rep' && lead.ownerId !== user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update lead status to Qualified
    leads[leadIndex] = {
      ...lead,
      status: 'Qualified',
      updatedAt: new Date().toISOString(),
    };

    // Create opportunity
    const opportunities = getOpportunities();
    const newOpportunity = {
      id: generateId('o'),
      title,
      value: Number(value),
      stage: 'Discovery' as const,
      ownerId: lead.ownerId,
      leadId: lead.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    opportunities.push(newOpportunity);

    // Save both updates
    saveLeads(leads);
    saveOpportunities(opportunities);

    res.status(201).json({
      success: true,
      lead: leads[leadIndex],
      opportunity: newOpportunity,
    });
  } catch (error) {
    console.error('Convert lead error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}