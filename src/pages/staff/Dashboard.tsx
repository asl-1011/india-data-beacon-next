
import { useQuery } from "@tanstack/react-query";
import { dashboardApi, pickupsApi } from "@/lib/api";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckIcon, TruckIcon, MapPinIcon, CalendarIcon, PackageIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const StaffDashboard = () => {
  // This would normally be fetched from your API
  const [todayPickups, setTodayPickups] = useState<any[]>([]);
  const [upcomingPickups, setUpcomingPickups] = useState<any[]>([]);

  const [stats, setStats] = useState({
    todayPickups: 0,
    completedToday: 0,
    weeklyPickups: 0,
    totalDistance: "0 km"
  });

  // Fetch dashboard data
  const { data: dashboardData } = useQuery({
    queryKey: ['staffDashboard'],
    queryFn: dashboardApi.getData
  });

  // Fetch pickups
  const { data: pickupsData, refetch } = useQuery({
    queryKey: ['staffPickups'],
    queryFn: pickupsApi.getAll
  });

  // Update state when data is loaded
  useEffect(() => {
    if (dashboardData) {
      setStats(dashboardData);
    }
  }, [dashboardData]);

  useEffect(() => {
    if (pickupsData) {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      
      const todayItems = pickupsData.filter((p: any) => 
        p.date === todayString || p.date === "2025-05-19" // For demo data
      );
      
      const upcomingItems = pickupsData.filter((p: any) => 
        p.date !== todayString && p.date !== "2025-05-19" // For demo data
      );
      
      setTodayPickups(todayItems);
      setUpcomingPickups(upcomingItems);
    }
  }, [pickupsData]);

  const completePickup = async (pickupId: number) => {
    try {
      await pickupsApi.update(pickupId, { status: "Completed" });
      
      // Update local state
      setTodayPickups(todayPickups.map(pickup => 
        pickup.id === pickupId ? { ...pickup, status: "Completed" } : pickup
      ));
      
      setStats({
        ...stats,
        completedToday: stats.completedToday + 1
      });
      
      toast({
        title: "Pickup Completed",
        description: `Pickup #${pickupId} has been marked as completed.`,
      });
      
      // Refetch all data
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete pickup.",
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout allowedRoles={['staff']}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Pickups</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayPickups}</div>
              <p className="text-xs text-muted-foreground">Assigned for today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedToday}</div>
              <p className="text-xs text-muted-foreground">
                {stats.todayPickups > 0 ? 
                  Math.round((stats.completedToday / stats.todayPickups) * 100) : 0}% of daily target
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Weekly Pickups</CardTitle>
              <PackageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weeklyPickups}</div>
              <p className="text-xs text-muted-foreground">Assigned this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDistance}</div>
              <p className="text-xs text-muted-foreground">Traveled this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Route */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Route</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Materials</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayPickups.length > 0 ? (
                  todayPickups.map((pickup) => (
                    <TableRow key={pickup.id}>
                      <TableCell className="font-medium">{pickup.time}</TableCell>
                      <TableCell>{pickup.customerName}</TableCell>
                      <TableCell>{pickup.address}</TableCell>
                      <TableCell>{pickup.items}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${pickup.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            pickup.status === 'Scheduled' || pickup.status === 'Assigned' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {pickup.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {pickup.status !== 'Completed' ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <MapPinIcon className="mr-1 h-4 w-4" /> View Map
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => completePickup(pickup.id)}
                            >
                              <CheckIcon className="mr-1 h-4 w-4" /> Mark Complete
                            </Button>
                          </div>
                        ) : (
                          <span className="text-green-600 font-medium">Completed</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No pickups scheduled for today
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Upcoming Pickups */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Pickups</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Materials</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingPickups.length > 0 ? (
                  upcomingPickups.map((pickup) => (
                    <TableRow key={pickup.id}>
                      <TableCell className="font-medium">{pickup.date}</TableCell>
                      <TableCell>{pickup.time}</TableCell>
                      <TableCell>{pickup.customerName}</TableCell>
                      <TableCell>{pickup.address}</TableCell>
                      <TableCell>{pickup.items}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                      No upcoming pickups scheduled
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
