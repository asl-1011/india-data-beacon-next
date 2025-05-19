
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, DecodedToken } from '@/lib/auth';

// Mock pickups database
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
  // Filter pickups based on user role
  let filteredPickups = [];
  
  if (user.role === 'admin') {
    // Admin sees all pickups
    filteredPickups = pickups;
  } else if (user.role === 'staff') {
    // Staff sees pickups assigned to them
    filteredPickups = pickups.filter(pickup => pickup.assignedTo === user.userId);
  } else {
    // Sellers see their own pickups
    filteredPickups = pickups.filter(pickup => pickup.customerId === user.userId);
  }
  
  return res.status(200).json(filteredPickups);
}

function handlePost(req: NextApiRequest, res: NextApiResponse, user: DecodedToken) {
  if (user.role !== 'seller') {
    return res.status(403).json({ message: 'Only sellers can create pickups' });
  }
  
  const { date, time, items, address, imageUrl } = req.body;
  
  // Validate required fields
  if (!date || !time || !items || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Create new pickup
  const newPickup = {
    id: pickups.length + 1,
    date,
    time,
    status: 'Pending',
    items,
    weight: 'Pending',
    amount: 'Pending',
    customerId: user.userId,
    customerName: 'John Smith', // In a real app, this would come from the user database
    address,
    assignedTo: null,
    staffName: null,
    imageUrl: imageUrl || null
  };
  
  pickups.push(newPickup);
  
  return res.status(201).json(newPickup);
}

function handler(req: NextApiRequest, res: NextApiResponse, user: DecodedToken) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res, user);
    case 'POST':
      return handlePost(req, res, user);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
