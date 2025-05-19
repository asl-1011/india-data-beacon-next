
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'scrapcycle_secret_key';

export interface DecodedToken {
  userId: number;
  email: string;
  role: 'seller' | 'staff' | 'admin';
  iat: number;
  exp: number;
}

export function getCurrentUser(req: NextApiRequest): DecodedToken | null {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function withAuth(
  handler: (req: NextApiRequest, res: NextApiResponse, user: DecodedToken) => void,
  roles?: string[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = getCurrentUser(req);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (roles && !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return handler(req, res, user);
  };
}
