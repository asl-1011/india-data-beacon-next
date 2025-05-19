
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'scrapcycle_secret_key';

export interface DecodedToken {
  userId: number;
  email: string;
  role: 'seller' | 'staff' | 'admin';
  iat: number;
  exp: number;
}

// Modified to work with regular request objects
export function getCurrentUser(req: Request): DecodedToken | null {
  try {
    // Extract token from cookies in the request
    const cookies = parseCookies(req);
    const token = cookies.token;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Helper function to parse cookies from request
function parseCookies(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return {};
  
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {} as Record<string, string>);
}

// Auth middleware for React Router
export function withAuth(roles?: string[]) {
  return (req: Request) => {
    const user = getCurrentUser(req);

    if (!user) {
      throw new Error('Unauthorized');
    }

    if (roles && !roles.includes(user.role)) {
      throw new Error('Forbidden');
    }

    return user;
  };
}
