
import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentUser } from '@/lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const user = getCurrentUser(req);
  
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Mock user database - in reality, this would query the database
  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "seller" },
    { id: 2, name: "Mike Collector", email: "mike@example.com", role: "staff" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin" },
  ];

  const userDetails = users.find(u => u.id === user.userId);

  if (!userDetails) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(userDetails);
}
