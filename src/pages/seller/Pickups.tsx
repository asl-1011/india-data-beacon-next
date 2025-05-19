
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { pickupsApi } from "@/lib/api";
import { RecyclingIcon } from "@/components/RecyclingIcon";

const SellerPickups = () => {
  const navigate = useNavigate();
  
  // Fetch pickups data
  const { data: pickups, isLoading } = useQuery({
    queryKey: ['sellerPickups'],
    queryFn: pickupsApi.getAll,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <RecyclingIcon className="w-12 h-12 text-green-600 animate-spin" />
            <p className="text-gray-600">Loading pickup data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Pickup History</h1>
          <Button 
            onClick={() => navigate("/seller/pickup/new")}
            className="bg-green-600 hover:bg-green-700"
          >
            Schedule Pickup
          </Button>
        </div>
        
        {pickups && pickups.length > 0 ? (
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Materials</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pickups.map((pickup) => (
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
                      <TableCell>{pickup.amount}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <RecyclingIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No pickups found</h3>
            <p className="mt-1 text-gray-500">You haven't scheduled any pickups yet.</p>
            <div className="mt-6">
              <Button 
                onClick={() => navigate("/seller/pickup/new")} 
                className="bg-green-600 hover:bg-green-700"
              >
                Schedule Your First Pickup
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerPickups;
