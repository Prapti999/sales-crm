import { NextApiRequest, NextApiResponse } from 'next';
import { getOpportunities, saveOpportunities, generateId } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (req.method === 'GET') {
    try {
      const opportunities = getOpportunities();
      
      // Filter opportunities based on user role
      const filteredOpportunities = user.role === 'rep' 
        ? opportunities.filter(opp => opp.ownerId === user.id)
        : opportunities;

      res.status(200).json({ success: true, opportunities: filteredOpportunities });
    } catch (error) {
      console.error('Get opportunities error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, value, stage } = req.body;

      if (!title || !value || !stage) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const opportunities = getOpportunities();
      const newOpportunity = {
        id: generateId('o'),
        title,
        value: Number(value),
        stage: stage as 'Discovery' | 'Proposal' | 'Won' | 'Lost',
        ownerId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      opportunities.push(newOpportunity);
      saveOpportunities(opportunities);

      res.status(201).json({ success: true, opportunity: newOpportunity });
    } catch (error) {
      console.error('Create opportunity error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}