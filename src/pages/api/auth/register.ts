
// API route handler for registration

// Mock database for users
let users = [
  { id: 1, name: "John Smith", email: "john@example.com", password: "password123", role: "seller" },
  { id: 2, name: "Mike Collector", email: "mike@example.com", password: "staffpass", role: "staff" },
  { id: 3, name: "Admin User", email: "admin@example.com", password: "adminpass", role: "admin" },
];

// This function handles the POST request to /api/auth/register
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
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

    // In a real app, we would use a proper library to generate JWT
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'scrapcycle_secret_key';

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the token as an HttpOnly cookie
    const cookieHeader = `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`;

    return new Response(JSON.stringify({ 
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
