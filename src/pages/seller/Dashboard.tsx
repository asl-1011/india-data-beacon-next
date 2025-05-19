
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PackageIcon, CalendarIcon, TruckIcon, MapPinIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SellerDashboard = () => {
  // This would normally be fetched from your API
  const [recentPickups, setRecentPickups] = useState([
    { id: 1, date: "2025-05-15", status: "Completed", items: "Paper, Plastic", weight: "5.2 kg" },
    { id: 2, date: "2025-05-25", status: "Scheduled", items: "Electronics", weight: "2.3 kg" },
    { id: 3, date: "2025-06-01", status: "Scheduled", items: "Metal, Others", weight: "8.7 kg" },
  ]);

  const [stats, setStats] = useState({
    totalPickups: 12,
    pendingPickups: 2,
    totalWeight: "76.4 kg",
    totalEarnings: "$132.50"
  });

  const schedulePickup = () => {
    // This would normally navigate to the schedule pickup page
    toast({
      title: "Coming Soon!",
      description: "The pickup scheduling feature will be available shortly.",
    });
    // window.location.href = "/seller/pickup/new";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole="seller" userName="John Smith" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome Back, John!</h1>
            <p className="text-gray-600">Here's what's happening with your recycling activities.</p>
          </div>
          <Button onClick={schedulePickup} className="mt-4 sm:mt-0 flex items-center gap-2">
            <CalendarIcon size={18} />
            Schedule New Pickup
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
              <PackageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPickups}</div>
              <p className="text-xs text-muted-foreground">Lifetime scrap pickups</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Pickups</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPickups}</div>
              <p className="text-xs text-muted-foreground">Awaiting collection</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Weight</CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWeight}</div>
              <p className="text-xs text-muted-foreground">Materials recycled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <div className="rounded-md bg-primary/10 p-1">
                <span className="text-primary text-sm">$</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEarnings}</div>
              <p className="text-xs text-muted-foreground">From all pickups</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Pickups */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Pickups</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Materials</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPickups.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">#{pickup.id}</TableCell>
                    <TableCell>{pickup.date}</TableCell>
                    <TableCell>{pickup.items}</TableCell>
                    <TableCell>{pickup.weight}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${pickup.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          pickup.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {pickup.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-center">
              <Button variant="outline">View All Pickups</Button>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12.5kg</div>
                  <p className="text-sm text-green-700">CO₂ Emissions Saved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">85L</div>
                  <p className="text-sm text-blue-700">Water Conserved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-amber-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <p className="text-sm text-amber-700">Trees Saved</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
