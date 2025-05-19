// API route handler for pickups
import { withAuth } from '../../../lib/auth';

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

// This function handles the GET request to /api/pickups
export async function GET(req: Request) {
  try {
    // Check authentication and get user
    const auth = withAuth(['seller', 'staff', 'admin']);
    const user = auth(req);

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
    
    return new Response(JSON.stringify(filteredPickups), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Pickups fetch error:', error);
    return new Response(JSON.stringify({ message: error instanceof Error ? error.message : 'Internal server error' }), {
      status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// This function handles the POST request to /api/pickups
export async function POST(req: Request) {
  try {
    // Check authentication and get user
    const auth = withAuth(['seller']);
    const user = auth(req);

    const body = await req.json();
    const { date, time, items, address, imageUrl } = body;
    
    // Validate required fields
    if (!date || !time || !items || !address) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
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
    
    return new Response(JSON.stringify(newPickup), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Pickup creation error:', error);
    return new Response(JSON.stringify({ message: error instanceof Error ? error.message : 'Internal server error' }), {
      status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
