import { NextApiRequest, NextApiResponse } from 'next';
import { getOpportunities, saveOpportunities } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  if (req.method === 'PUT') {
    try {
      const { title, value, stage } = req.body;
      const opportunities = getOpportunities();
      const oppIndex = opportunities.findIndex(opp => opp.id === id);

      if (oppIndex === -1) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }

      const opportunity = opportunities[oppIndex];

      // Check permissions
      if (user.role === 'rep' && opportunity.ownerId !== user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Update opportunity
      opportunities[oppIndex] = {
        ...opportunity,
        title: title || opportunity.title,
        value: value ? Number(value) : opportunity.value,
        stage: stage || opportunity.stage,
        updatedAt: new Date().toISOString(),
      };

      saveOpportunities(opportunities);

      res.status(200).json({ success: true, opportunity: opportunities[oppIndex] });
    } catch (error) {
      console.error('Update opportunity error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const opportunities = getOpportunities();
      const oppIndex = opportunities.findIndex(opp => opp.id === id);

      if (oppIndex === -1) {
        return res.status(404).json({ message: 'Opportunity not found' });
      }

      const opportunity = opportunities[oppIndex];

      // Check permissions
      if (user.role === 'rep' && opportunity.ownerId !== user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      opportunities.splice(oppIndex, 1);
      saveOpportunities(opportunities);

      res.status(200).json({ success: true, message: 'Opportunity deleted' });
    } catch (error) {
      console.error('Delete opportunity error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}