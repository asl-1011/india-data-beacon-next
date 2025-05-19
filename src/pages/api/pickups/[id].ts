import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, DecodedToken } from '@/lib/auth';

// Mock pickups database (same as in the index file)
let pickups = [
  { 
    id: 1, 
    date: "2025-05-15", 
    time: "10:00 AM - 12:00 PM",
    status: "Completed", 
    items: "Paper, Plastic", 
    weight: "5.2 kg", 
    amount: "$2.60",
    customerId: 1,
    customerName: "John Smith",
    address: "123 Main St, Anytown",
    assignedTo: 2,
    staffName: "Mike Collector",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2970&auto=format&fit=crop"
  },
  { 
    id: 2, 
    date: "2025-05-25", 
    time: "2:00 PM - 4:00 PM",
    status: "Scheduled", 
    items: "Electronics", 
    weight: "2.3 kg", 
    amount: "Pending",
    customerId: 1,
    customerName: "John Smith",
    address: "123 Main St, Anytown",
    assignedTo: 2,
    staffName: "Mike Collector",
    imageUrl: "https://images.unsplash.com/photo-1605600659453-128bffc9c020?q=80&w=2944&auto=format&fit=crop"
  },
  { 
    id: 3, 
    date: "2025-06-01", 
    time: "9:00 AM - 11:00 AM",
    status: "Scheduled", 
    items: "Metal, Others", 
    weight: "8.7 kg", 
    amount: "Pending",
    customerId: 1,
    customerName: "John Smith",
    address: "123 Main St, Anytown",
    assignedTo: 2,
    staffName: "Mike Collector",
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2970&auto=format&fit=crop"
  },
  { 
    id: 4, 
    date: "2025-04-10", 
    time: "1:00 PM - 3:00 PM",
    status: "Completed", 
    items: "Books, Paper", 
    weight: "12.1 kg", 
    amount: "$6.05",
    customerId: 1,
    customerName: "John Smith",
    address: "123 Main St, Anytown",
    assignedTo: 2,
    staffName: "Mike Collector",
    imageUrl: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?q=80&w=2970&auto=format&fit=crop"
  },
];

function handleGet(req: NextApiRequest, res: NextApiResponse, user: DecodedToken) {
  const { id } = req.query;
  const pickupId = parseInt(id as string);
  
  const pickup = pickups.find(p => p.id === pickupId);
  
  if (!pickup) {
    return res.status(404).json({ message: 'Pickup not found' });
  }
  
  // Check permissions based on role
  if (user.role === 'seller' && pickup.customerId !== user.userId) {
    return res.status(403).json({ message: 'Not authorized to view this pickup' });
  }
  
  if (user.role === 'staff' && pickup.assignedTo !== user.userId) {
    return res.status(403).json({ message: 'Not authorized to view this pickup' });
  }
  
  return res.status(200).json(pickup);
}

function handlePatch(req: NextApiRequest, res: NextApiResponse, user: DecodedToken) {
  const { id } = req.query;
  const pickupId = parseInt(id as string);
  
  const pickup = pickups.find(p => p.id === pickupId);
  
  if (!pickup) {
    return res.status(404).json({ message: 'Pickup not found' });
  }
  
  // Check permissions based on role and action
  if (user.role === 'admin') {
    // Admin can update any pickup
    const { status, assignedTo, staffName } = req.body;
    
    if (status) pickup.status = status;
    if (assignedTo) pickup.assignedTo = assignedTo;
    if (staffName) pickup.staffName = staffName;
  } else if (user.role === 'staff') {
    // Staff can only update status of pickups assigned to them
    if (pickup.assignedTo !== user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this pickup' });
    }
    
    const { status } = req.body;
    if (status) pickup.status = status;
    
    // If marking as completed, set weight and amount
    if (status === 'Completed' && pickup.weight === 'Pending') {
      pickup.weight = `${(Math.random() * 10 + 1).toFixed(1)} kg`;
      pickup.amount = `$${(Math.random() * 10 + 1).toFixed(2)}`;
    }
  } else {
    // Sellers cannot update pickups
    return res.status(403).json({ message: 'Not authorized to update pickups' });
  }
  
  return res.status(200).json(pickup);
}

function handler(req: NextApiRequest, res: NextApiResponse, user: DecodedToken) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res, user);
    case 'PATCH':
      return handlePatch(req, res, user);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
