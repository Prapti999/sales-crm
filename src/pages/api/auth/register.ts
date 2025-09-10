import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, saveUsers, generateId } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['rep', 'manager', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
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

    const authUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    const token = generateToken(authUser);

    res.status(201).json({
      success: true,
      token,
      user: authUser,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}