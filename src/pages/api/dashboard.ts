
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, DecodedToken } from '@/lib/auth';

// Mock dashboard data
const dashboardData = {
  seller: {
    totalPickups: 12,
    pendingPickups: 2,
    totalWeight: "76.4 kg",
    totalEarnings: "$132.50",
    environmentalImpact: {
      co2Saved: "12.5kg",
      waterConserved: "85L",
      treesSaved: "3"
    }
  },
  staff: {
    todayPickups: 2,
    completedToday: 0,
    weeklyPickups: 15,
    totalDistance: "28.5 km"
  },
  admin: {
    totalPickupsToday: 8,
    pickupsCompleted: 5,
    activeStaff: 4,
    totalEarnings: "$345.20",
    recentActivity: [
      { id: 1, action: "Pickup Completed", user: "Mike Collector", time: "10:15 AM" },
      { id: 2, action: "New Pickup Scheduled", user: "John Smith", time: "9:30 AM" },
      { id: 3, action: "Staff Assigned", user: "Admin", time: "9:15 AM" },
      { id: 4, action: "Pickup Completed", user: "Sara Picker", time: "8:45 AM" }
    ]
  }
};

function handler(req: NextApiRequest, res: NextApiResponse, user: DecodedToken) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Return dashboard data based on user role
  switch (user.role) {
    case 'seller':
      return res.status(200).json(dashboardData.seller);
    case 'staff':
      return res.status(200).json(dashboardData.staff);
    case 'admin':
      return res.status(200).json(dashboardData.admin);
    default:
      return res.status(403).json({ message: 'Invalid user role' });
  }
}

export default withAuth(handler);
