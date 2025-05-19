
// API route handler for dashboard data
import { withAuth } from '../../lib/auth';

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

// This function handles the GET request to /api/dashboard
export async function GET(req: Request) {
  try {
    // Check authentication and get user
    const auth = withAuth(['seller', 'staff', 'admin']);
    const user = auth(req);
    
    // Return dashboard data based on user role
    switch (user.role) {
      case 'seller':
        return new Response(JSON.stringify(dashboardData.seller), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      case 'staff':
        return new Response(JSON.stringify(dashboardData.staff), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      case 'admin':
        return new Response(JSON.stringify(dashboardData.admin), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      default:
        return new Response(JSON.stringify({ message: 'Invalid user role' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Dashboard error:', error);
    return new Response(JSON.stringify({ message: error instanceof Error ? error.message : 'Internal server error' }), {
      status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
