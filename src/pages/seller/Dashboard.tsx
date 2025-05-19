
import { useQuery } from "@tanstack/react-query";
import { dashboardApi, pickupsApi } from "@/lib/api";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageCheck, Clock, TrendingUp, DollarSign, Truck } from "lucide-react";
import { useState, useEffect } from "react";

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalPickups: 0,
    pendingPickups: 0,
    totalWeight: "0 kg",
    totalEarnings: "$0.00",
    environmentalImpact: {
      co2Saved: "0kg",
      waterConserved: "0L",
      treesSaved: "0"
    }
  });

  const [recentPickups, setRecentPickups] = useState<any[]>([]);

  // Fetch dashboard data
  const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
    queryKey: ['sellerDashboard'],
    queryFn: dashboardApi.getData
  });

  // Fetch recent pickups
  const { data: pickupsData, isLoading: isLoadingPickups } = useQuery({
    queryKey: ['sellerPickups'],
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
      setRecentPickups(pickupsData.slice(0, 3));
    }
  }, [pickupsData]);

  return (
    <DashboardLayout allowedRoles={['seller']}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
              <PackageCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPickups}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Pickups</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPickups}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Weight</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWeight}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEarnings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact */}
        <h2 className="text-xl font-semibold mb-4">Environmental Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-green-700">CO₂ Emissions Saved</p>
                  <p className="text-2xl font-bold text-green-900">{stats.environmentalImpact.co2Saved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Water Conserved</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.environmentalImpact.waterConserved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">Trees Saved</p>
                  <p className="text-2xl font-bold text-amber-900">{stats.environmentalImpact.treesSaved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Pickups */}
        <h2 className="text-xl font-semibold mb-4">Recent Pickups</h2>
        <div className="bg-white rounded-lg shadow">
          {isLoadingPickups ? (
            <div className="p-8 text-center">Loading recent pickups...</div>
          ) : recentPickups.length > 0 ? (
            <div className="divide-y">
              {recentPickups.map((pickup) => (
                <div key={pickup.id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{pickup.date}</p>
                    <p className="text-sm text-gray-500">{pickup.items}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium">{pickup.weight}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${pickup.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        pickup.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {pickup.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No pickups found. Schedule your first pickup now!
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerDashboard;
