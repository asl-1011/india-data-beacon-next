
// API route handler for login

// Mock database for users
const users = [
  { id: 1, name: "John Smith", email: "john@example.com", password: "password123", role: "seller" },
  { id: 2, name: "Mike Collector", email: "mike@example.com", password: "staffpass", role: "staff" },
  { id: 3, name: "Admin User", email: "admin@example.com", password: "adminpass", role: "admin" },
];

// This function handles the POST request to /api/auth/login
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Find user
    const user = users.find(user => user.email === email);
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In a real app, we would use a proper library to generate JWT
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'scrapcycle_secret_key';

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set the token as an HttpOnly cookie
    const cookieHeader = `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`;

    return new Response(JSON.stringify({ 
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name, 
        email: user.email,
        role: user.role
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
