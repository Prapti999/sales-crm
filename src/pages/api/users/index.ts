import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, saveUsers, generateId } from '@/lib/db';
import { verifyToken, hashPassword } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Only admin can access user management
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  if (req.method === 'GET') {
    try {
      const users = getUsers();
      // Remove passwords from response
      const safeUsers = users.map(({ password, ...user }) => user);
      res.status(200).json({ success: true, users: safeUsers });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      if (!['rep', 'manager', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      const users = getUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create new user
      const newUser = {
        id: generateId('u'),
        name,
        email,
        password: hashedPassword,
        role: role as 'rep' | 'manager' | 'admin',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      // Remove password from response
      const { password: _, ...safeUser } = newUser;

      res.status(201).json({ success: true, user: safeUser });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}