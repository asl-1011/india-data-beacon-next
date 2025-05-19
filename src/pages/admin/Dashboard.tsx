
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  TruckIcon, 
  UserIcon, 
  PackageIcon, 
  CheckIcon, 
  ArrowRightIcon, 
  CalendarIcon,
  UsersIcon 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  // This would normally be fetched from your API
  const [recentPickups, setRecentPickups] = useState([
    { 
      id: 201, 
      date: "2025-05-19", 
      customer: "John Smith",
      address: "123 Main St, Anytown",
      items: "Paper, Plastic", 
      assignedTo: "Mike Collector",
      status: "Assigned" 
    },
    { 
      id: 202, 
      date: "2025-05-19", 
      customer: "Jane Doe",
      address: "456 Oak Ave, Anytown",
      items: "Electronics", 
      assignedTo: "Sara Picker",
      status: "Completed" 
    },
    { 
      id: 203, 
      date: "2025-05-19", 
      customer: "Bob Johnson",
      address: "789 Pine Rd, Anytown",
      items: "Metal, Others", 
      assignedTo: null,
      status: "Pending" 
    },
  ]);

  const [stats, setStats] = useState({
    totalPickups: 203,
    pendingAssignment: 8,
    activeStaff: 12,
    revenue: "$2,850.75"
  });

  const assignStaff = (pickupId: number) => {
    // This would normally open a modal to select staff
    toast({
      title: "Coming Soon!",
      description: "The staff assignment feature will be available shortly.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole="admin" userName="Admin User" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-gray-600">Manage pickups, staff, and monitor system performance.</p>
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
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignment</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingAssignment}</div>
              <p className="text-xs text-muted-foreground">Require staff assignment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeStaff}</div>
              <p className="text-xs text-muted-foreground">Currently employed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="rounded-md bg-primary/10 p-1">
                <span className="text-primary text-sm">$</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.revenue}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Pickups */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Pickups</h2>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                View All <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Materials</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPickups.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">#{pickup.id}</TableCell>
                    <TableCell>{pickup.date}</TableCell>
                    <TableCell>{pickup.customer}</TableCell>
                    <TableCell>{pickup.items}</TableCell>
                    <TableCell>{pickup.assignedTo || "—"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${pickup.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          pickup.status === 'Assigned' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {pickup.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {pickup.status === 'Pending' ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => assignStaff(pickup.id)}
                        >
                          <UserIcon className="mr-1 h-4 w-4" /> Assign Staff
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">View Details</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Material Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Material Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Paper</span>
                  <span className="text-sm">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Metal</span>
                  <span className="text-sm">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Plastic</span>
                  <span className="text-sm">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Electronics</span>
                  <span className="text-sm">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Others</span>
                  <span className="text-sm">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Performance */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Staff Performance</h2>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left pb-3 text-sm font-medium text-gray-500">Staff Member</th>
                  <th className="text-center pb-3 text-sm font-medium text-gray-500">Pickups</th>
                  <th className="text-center pb-3 text-sm font-medium text-gray-500">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Mike Collector</td>
                  <td className="text-center">24</td>
                  <td className="text-center">
                    <span className="text-green-600">98%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Sara Picker</td>
                  <td className="text-center">18</td>
                  <td className="text-center">
                    <span className="text-green-600">95%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Tom Hauler</td>
                  <td className="text-center">15</td>
                  <td className="text-center">
                    <span className="text-yellow-600">85%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Lisa Driver</td>
                  <td className="text-center">12</td>
                  <td className="text-center">
                    <span className="text-green-600">100%</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="flex items-center gap-1 mx-auto">
                Full Staff Report <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
