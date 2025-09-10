import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '@/lib/db';
import { comparePassword, generateToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const authUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(authUser);

    res.status(200).json({
      success: true,
      token,
      user: authUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}