
import Header from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const StaffPickups = () => {
  // This would normally be fetched from your API
  const [pickups, setPickups] = useState([
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
    { 
      id: 104, 
      date: "2025-05-21", 
      time: "1:00 PM - 3:00 PM",
      customer: "Alice Brown",
      address: "321 Elm St, Anytown",
      items: "Books, Paper", 
      status: "Assigned" 
    },
    { 
      id: 105, 
      date: "2025-05-22", 
      time: "11:00 AM - 1:00 PM",
      customer: "Charlie Davis",
      address: "654 Maple Ave, Anytown",
      items: "Plastic, Electronics", 
      status: "Assigned" 
    },
  ]);

  const completePickup = (pickupId: number) => {
    // This would normally send a request to your API
    setPickups(pickups.map(pickup => 
      pickup.id === pickupId ? { ...pickup, status: "Completed" } : pickup
    ));
    
    toast({
      title: "Pickup Completed",
      description: `Pickup #${pickupId} has been marked as completed.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole="staff" userName="Mike Collector" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Assigned Pickups</h1>
        
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Materials</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pickups.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell>{pickup.date}</TableCell>
                    <TableCell>{pickup.time}</TableCell>
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
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">View Map</Button>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffPickups;
