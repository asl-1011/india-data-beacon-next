
import { useQuery } from "@tanstack/react-query";
import { dashboardApi, pickupsApi, staffApi } from "@/lib/api";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PackageCheck, Users, DollarSign, Calendar } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPickupsToday: 0,
    pickupsCompleted: 0,
    activeStaff: 0,
    totalEarnings: "$0.00",
    recentActivity: []
  });

  const [pickupData, setPickupData] = useState<any[]>([]);

  // Fetch dashboard data
  const { data: dashboardData } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: dashboardApi.getData
  });

  // Fetch pickups for chart
  const { data: pickupsData } = useQuery({
    queryKey: ['adminPickups'],
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
      // Group pickups by date for chart
      const grouped = pickupsData.reduce((acc: any, pickup: any) => {
        const date = pickup.date;
        if (!acc[date]) {
          acc[date] = { date, count: 0, completed: 0 };
        }
        acc[date].count += 1;
        if (pickup.status === 'Completed') {
          acc[date].completed += 1;
        }
        return acc;
      }, {});

      // Convert to array for chart
      const chartData = Object.values(grouped).sort((a: any, b: any) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      setPickupData(chartData);
    }
  }, [pickupsData]);

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Pickups</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPickupsToday}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pickupsCompleted}/{stats.totalPickupsToday} completed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeStaff}</div>
              <p className="text-xs text-muted-foreground">
                Staff members on duty
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
              <PackageCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pickupData.reduce((sum: number, item: any) => sum + item.count, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEarnings}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Pickup Statistics Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pickup Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={pickupData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Total Pickups" fill="#10B981" />
                    <Bar dataKey="completed" name="Completed" fill="#6EE7B7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity ? (
                  stats.recentActivity.map((activity: any) => (
                    <div key={activity.id} className="flex items-center">
                      <div className="mr-4 bg-green-100 p-2 rounded-full">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">No recent activity</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Assigned Pickups</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Mike Collector</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>23</TableCell>
                  <TableCell className="text-green-600">98%</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sara Picker</TableCell>
                  <TableCell>18</TableCell>
                  <TableCell>17</TableCell>
                  <TableCell className="text-green-600">95%</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tom Hauler</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>13</TableCell>
                  <TableCell className="text-yellow-600">85%</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
