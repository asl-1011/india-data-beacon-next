
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'scrapcycle_secret_key';

// Mock database for users
const users = [
  { id: 1, name: "John Smith", email: "john@example.com", password: "password123", role: "seller" },
  { id: 2, name: "Mike Collector", email: "mike@example.com", password: "staffpass", role: "staff" },
  { id: 3, name: "Admin User", email: "admin@example.com", password: "adminpass", role: "admin" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the token as an HttpOnly cookie
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`);

    return res.status(200).json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name, 
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
