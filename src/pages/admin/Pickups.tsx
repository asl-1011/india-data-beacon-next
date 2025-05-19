
import { useState } from "react";
import Header from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const AdminPickups = () => {
  // This would normally be fetched from your API
  const [pickups, setPickups] = useState([
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
    { 
      id: 204, 
      date: "2025-05-20", 
      customer: "Alice Brown",
      address: "321 Elm St, Anytown",
      items: "Books, Paper", 
      assignedTo: null,
      status: "Pending" 
    },
    { 
      id: 205, 
      date: "2025-05-20", 
      customer: "Charlie Davis",
      address: "654 Maple Ave, Anytown",
      items: "Plastic, Electronics", 
      assignedTo: "Tom Hauler",
      status: "Assigned" 
    },
  ]);

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
        <h1 className="text-2xl font-bold mb-6">All Pickups</h1>
        
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">All</Button>
                <Button variant="outline" size="sm">Pending</Button>
                <Button variant="outline" size="sm">Assigned</Button>
                <Button variant="outline" size="sm">Completed</Button>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="date" 
                  className="h-9 rounded-md border border-input px-3 py-1 text-sm"
                />
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Materials</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pickups.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">#{pickup.id}</TableCell>
                    <TableCell>{pickup.date}</TableCell>
                    <TableCell>{pickup.customer}</TableCell>
                    <TableCell>{pickup.address}</TableCell>
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
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        {pickup.status === 'Pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => assignStaff(pickup.id)}
                          >
                            <UserIcon className="mr-1 h-4 w-4" /> Assign Staff
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-500">
                Showing 5 of 42 results
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPickups;
