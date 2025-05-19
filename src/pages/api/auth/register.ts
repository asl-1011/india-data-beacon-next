
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
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (in a real app, this would save to a database)
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // In a real app, this would be hashed
      role: 'seller', // Default role for new registrations
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the token as an HttpOnly cookie
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`);

    return res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
