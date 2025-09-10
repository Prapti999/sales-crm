import { NextApiRequest, NextApiResponse } from 'next';
import { getLeads, saveLeads, generateId } from '@/lib/db';
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
      const leads = getLeads();
      
      // Filter leads based on user role
      const filteredLeads = user.role === 'rep' 
        ? leads.filter(lead => lead.ownerId === user.id)
        : leads;

      res.status(200).json({ success: true, leads: filteredLeads });
    } catch (error) {
      console.error('Get leads error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, phone, status } = req.body;

      if (!name || !email || !phone || !status) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const leads = getLeads();
      const newLead = {
        id: generateId('l'),
        name,
        email,
        phone,
        status: status as 'New' | 'Contacted' | 'Qualified',
        ownerId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      leads.push(newLead);
      saveLeads(leads);

      res.status(201).json({ success: true, lead: newLead });
    } catch (error) {
      console.error('Create lead error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}