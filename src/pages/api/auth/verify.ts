import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/lib/auth';

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

  res.status(200).json({
    success: true,
    user,
  });
}