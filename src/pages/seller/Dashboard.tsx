
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PackageIcon, CalendarIcon, TruckIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { dashboardApi, pickupsApi } from "@/lib/api";
import { RecyclingIcon } from "@/components/RecyclingIcon";

const SellerDashboard = () => {
  const navigate = useNavigate();

  // Fetch dashboard data
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['sellerDashboard'],
    queryFn: dashboardApi.getData,
  });

  // Fetch recent pickups
  const { data: pickupsData, isLoading: isPickupsLoading } = useQuery({
    queryKey: ['sellerPickups'],
    queryFn: pickupsApi.getAll,
  });

  // Get only the first 3 pickups for the recent pickups section
  const recentPickups = pickupsData ? pickupsData.slice(0, 3) : [];

  const schedulePickup = () => {
    navigate("/seller/pickup/new");
  };

  if (isDashboardLoading || isPickupsLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <RecyclingIcon className="w-12 h-12 text-green-600 animate-spin" />
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome Back!</h1>
            <p className="text-gray-600">Here's what's happening with your recycling activities.</p>
          </div>
          <Button onClick={schedulePickup} className="mt-4 sm:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700">
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
              <div className="text-2xl font-bold">{dashboardData?.totalPickups || 0}</div>
              <p className="text-xs text-muted-foreground">Lifetime scrap pickups</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Pickups</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.pendingPickups || 0}</div>
              <p className="text-xs text-muted-foreground">Awaiting collection</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Weight</CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.totalWeight || "0 kg"}</div>
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
              <div className="text-2xl font-bold">{dashboardData?.totalEarnings || "$0.00"}</div>
              <p className="text-xs text-muted-foreground">From all pickups</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Pickups */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Pickups</h2>
            {recentPickups.length > 0 ? (
              <>
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
                              pickup.status === 'Scheduled' || pickup.status === 'Assigned' ? 'bg-blue-100 text-blue-800' : 
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
                  <Button variant="outline" onClick={() => navigate("/seller/pickups")}>View All Pickups</Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <PackageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No pickups yet</h3>
                <p className="mt-1 text-gray-500">Schedule your first pickup to start recycling.</p>
                <div className="mt-6">
                  <Button onClick={schedulePickup} className="bg-green-600 hover:bg-green-700">
                    Schedule Pickup
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {dashboardData?.environmentalImpact?.co2Saved || "0kg"}
                  </div>
                  <p className="text-sm text-green-700">CO₂ Emissions Saved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {dashboardData?.environmentalImpact?.waterConserved || "0L"}
                  </div>
                  <p className="text-sm text-blue-700">Water Conserved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-amber-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {dashboardData?.environmentalImpact?.treesSaved || "0"}
                  </div>
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
