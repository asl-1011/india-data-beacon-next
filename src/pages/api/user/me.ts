
// API route handler for current user
import { getCurrentUser } from '../../../lib/auth';

// This function handles the GET request to /api/user/me
export async function GET(req: Request) {
  try {
    const user = getCurrentUser(req);
    
    if (!user) {
      return new Response(JSON.stringify({ message: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // In a real app, we would fetch the full user data from a database
    const userData = {
      id: user.userId,
      email: user.email,
      role: user.role,
      // Mock additional user data
      name: user.role === 'seller' ? 'John Smith' : 
             user.role === 'staff' ? 'Mike Collector' : 'Admin User',
      created: '2023-01-01'
    };
    
    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('User fetch error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
