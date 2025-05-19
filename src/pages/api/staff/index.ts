
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, DecodedToken } from '@/lib/auth';

// Mock staff database
const staff = [
  { 
    id: 2, 
    name: "Mike Collector", 
    email: "mike@example.com",
    phone: "555-123-4567",
    role: "Staff",
    status: "Active",
    assignedPickups: 24,
    completionRate: "98%",
    imageUrl: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=2944&auto=format&fit=crop"
  },
  { 
    id: 5, 
    name: "Sara Picker", 
    email: "sara@example.com",
    phone: "555-987-6543",
    role: "Staff",
    status: "Active",
    assignedPickups: 18,
    completionRate: "95%",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2976&auto=format&fit=crop"
  },
  { 
    id: 6, 
    name: "Tom Hauler", 
    email: "tom@example.com",
    phone: "555-456-7890",
    role: "Staff",
    status: "Active",
    assignedPickups: 15,
    completionRate: "85%",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2970&auto=format&fit=crop"
  },
  { 
    id: 7, 
    name: "Lisa Driver", 
    email: "lisa@example.com",
    phone: "555-789-0123",
    role: "Staff",
    status: "Active",
    assignedPickups: 12,
    completionRate: "100%",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop"
  },
  { 
    id: 8, 
    name: "John Handler", 
    email: "john@example.com",
    phone: "555-234-5678",
    role: "Staff",
    status: "Inactive",
    assignedPickups: 0,
    completionRate: "N/A",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop"
  },
];

function handleGet(req: NextApiRequest, res: NextApiResponse, user: DecodedToken) {
  // Only admin can access staff list
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  
  return res.status(200).json(staff);
}

function handler(req: NextApiRequest, res: NextApiResponse, user: DecodedToken) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res, user);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
