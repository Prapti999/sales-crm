import { NextApiRequest, NextApiResponse } from 'next';
import { getLeads, saveLeads } from '@/lib/db';
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
      const { name, email, phone, status } = req.body;
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

      // Update lead
      leads[leadIndex] = {
        ...lead,
        name: name || lead.name,
        email: email || lead.email,
        phone: phone || lead.phone,
        status: status || lead.status,
        updatedAt: new Date().toISOString(),
      };

      saveLeads(leads);

      res.status(200).json({ success: true, lead: leads[leadIndex] });
    } catch (error) {
      console.error('Update lead error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
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

      leads.splice(leadIndex, 1);
      saveLeads(leads);

      res.status(200).json({ success: true, message: 'Lead deleted' });
    } catch (error) {
      console.error('Delete lead error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}