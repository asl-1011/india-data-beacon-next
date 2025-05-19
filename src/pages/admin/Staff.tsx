
import { useState } from "react";
import Header from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { UserIcon, EditIcon, TrashIcon } from "lucide-react";

const AdminStaff = () => {
  // This would normally be fetched from your API
  const [staff, setStaff] = useState([
    { 
      id: 1, 
      name: "Mike Collector", 
      email: "mike@example.com",
      phone: "555-123-4567",
      role: "Staff",
      status: "Active",
      assignedPickups: 24,
      completionRate: "98%"
    },
    { 
      id: 2, 
      name: "Sara Picker", 
      email: "sara@example.com",
      phone: "555-987-6543",
      role: "Staff",
      status: "Active",
      assignedPickups: 18,
      completionRate: "95%"
    },
    { 
      id: 3, 
      name: "Tom Hauler", 
      email: "tom@example.com",
      phone: "555-456-7890",
      role: "Staff",
      status: "Active",
      assignedPickups: 15,
      completionRate: "85%"
    },
    { 
      id: 4, 
      name: "Lisa Driver", 
      email: "lisa@example.com",
      phone: "555-789-0123",
      role: "Staff",
      status: "Active",
      assignedPickups: 12,
      completionRate: "100%"
    },
    { 
      id: 5, 
      name: "John Handler", 
      email: "john@example.com",
      phone: "555-234-5678",
      role: "Staff",
      status: "Inactive",
      assignedPickups: 0,
      completionRate: "N/A"
    },
  ]);

  const addStaffMember = () => {
    toast({
      title: "Coming Soon!",
      description: "The add staff feature will be available shortly.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole="admin" userName="Admin User" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <Button onClick={addStaffMember}>
            <UserIcon className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </div>
        
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">All Staff</Button>
                <Button variant="outline" size="sm">Active</Button>
                <Button variant="outline" size="sm">Inactive</Button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search staff..."
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm pr-8"
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </Button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Pickups</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell>{member.assignedPickups}</TableCell>
                    <TableCell>
                      <span className={member.completionRate !== "N/A" ? 
                        parseInt(member.completionRate) > 90 ? "text-green-600" : 
                        parseInt(member.completionRate) > 80 ? "text-yellow-600" : "text-red-600"
                        : ""}>
                        {member.completionRate}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
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

export default AdminStaff;
