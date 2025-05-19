
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import our role-based pages (these will be created next)
import SellerDashboard from "./pages/seller/Dashboard";
import SellerPickups from "./pages/seller/Pickups";
import SellerNewPickup from "./pages/seller/NewPickup";

import StaffDashboard from "./pages/staff/Dashboard";
import StaffPickups from "./pages/staff/Pickups";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminPickups from "./pages/admin/Pickups";
import AdminStaff from "./pages/admin/Staff";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          
          {/* Auth routes will be handled by API but we'll need pages */}
          <Route path="/login" element={<div>Login Page (To be implemented)</div>} />
          <Route path="/register" element={<div>Register Page (To be implemented)</div>} />
          
          {/* Seller routes */}
          <Route path="/seller" element={<Navigate to="/seller/dashboard" replace />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/pickups" element={<SellerPickups />} />
          <Route path="/seller/pickup/new" element={<SellerNewPickup />} />
          
          {/* Staff routes */}
          <Route path="/staff" element={<Navigate to="/staff/dashboard" replace />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/pickups" element={<StaffPickups />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/pickups" element={<AdminPickups />} />
          <Route path="/admin/staff" element={<AdminStaff />} />
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
