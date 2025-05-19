
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TruckIcon, CheckIcon, MapPinIcon, CalendarIcon, PackageIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const StaffDashboard = () => {
  // This would normally be fetched from your API
  const [assignedPickups, setAssignedPickups] = useState([
    { 
      id: 101, 
      date: "2025-05-19", 
      time: "10:00 AM - 12:00 PM",
      customer: "John Smith",
      address: "123 Main St, Anytown",
      items: "Paper, Plastic", 
      status: "Assigned" 
    },
    { 
      id: 102, 
      date: "2025-05-19", 
      time: "2:00 PM - 4:00 PM",
      customer: "Jane Doe",
      address: "456 Oak Ave, Anytown",
      items: "Electronics", 
      status: "Assigned" 
    },
    { 
      id: 103, 
      date: "2025-05-20", 
      time: "9:00 AM - 11:00 AM",
      customer: "Bob Johnson",
      address: "789 Pine Rd, Anytown",
      items: "Metal, Others", 
      status: "Assigned" 
    },
  ]);

  const [stats, setStats] = useState({
    todayPickups: 2,
    completedToday: 0,
    weeklyPickups: 15,
    totalDistance: "28.5 km"
  });

  const completePickup = (pickupId: number) => {
    // This would normally send a request to your API
    setAssignedPickups(assignedPickups.map(pickup => 
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
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole="staff" userName="Mike Collector" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Staff Dashboard</h1>
          <p className="text-gray-600">Manage your assigned pickups and track your progress.</p>
        </div>

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
                {Math.round((stats.completedToday / stats.todayPickups) * 100) || 0}% of daily target
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
        <div className="bg-white shadow rounded-lg">
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
                {assignedPickups.filter(pickup => pickup.date === "2025-05-19").map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">{pickup.time}</TableCell>
                    <TableCell>{pickup.customer}</TableCell>
                    <TableCell>{pickup.address}</TableCell>
                    <TableCell>{pickup.items}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${pickup.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          pickup.status === 'Assigned' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {pickup.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {pickup.status !== 'Completed' ? (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => completePickup(pickup.id)}
                        >
                          <CheckIcon className="mr-1 h-4 w-4" /> Mark Complete
                        </Button>
                      ) : (
                        <span className="text-green-600 font-medium">Completed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Upcoming Pickups */}
        <div className="mt-8 bg-white shadow rounded-lg">
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
                {assignedPickups.filter(pickup => pickup.date !== "2025-05-19").map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">{pickup.date}</TableCell>
                    <TableCell>{pickup.time}</TableCell>
                    <TableCell>{pickup.customer}</TableCell>
                    <TableCell>{pickup.address}</TableCell>
                    <TableCell>{pickup.items}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
