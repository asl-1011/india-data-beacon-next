
import Header from "@/components/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SellerPickups = () => {
  // This would normally be fetched from your API
  const [pickups, setPickups] = useState([
    { id: 1, date: "2025-05-15", status: "Completed", items: "Paper, Plastic", weight: "5.2 kg", amount: "$2.60" },
    { id: 2, date: "2025-05-25", status: "Scheduled", items: "Electronics", weight: "2.3 kg", amount: "Pending" },
    { id: 3, date: "2025-06-01", status: "Scheduled", items: "Metal, Others", weight: "8.7 kg", amount: "Pending" },
    { id: 4, date: "2025-04-10", status: "Completed", items: "Books, Paper", weight: "12.1 kg", amount: "$6.05" },
    { id: 5, date: "2025-03-22", status: "Completed", items: "Metal", weight: "3.8 kg", amount: "$7.60" },
    { id: 6, date: "2025-02-15", status: "Completed", items: "Plastic, Electronics", weight: "4.5 kg", amount: "$5.40" },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole="seller" userName="John Smith" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Pickup History</h1>
        
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
                          pickup.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
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
      </main>
    </div>
  );
};

export default SellerPickups;
