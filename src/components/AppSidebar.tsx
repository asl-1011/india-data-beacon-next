
import { useUser } from "@/contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  PackageCheck, 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  LogOut 
} from "lucide-react";

const AppSidebar = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  
  // If no user, return empty sidebar
  if (!user) return null;
  
  return (
    <div className="h-screen w-64 bg-green-800 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center space-x-2 mb-6">
        <PackageCheck size={24} className="text-green-400" />
        <h1 className="text-xl font-bold">ScrapCycle</h1>
      </div>

      <Separator className="my-4 bg-green-700" />
      
      <div className="mb-6">
        <p className="text-sm text-green-300">Welcome,</p>
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-green-300 capitalize">{user.role}</p>
      </div>
      
      <nav className="space-y-1">
        {user.role === 'seller' && (
          <>
            <SidebarLink 
              to="/seller/dashboard" 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard"
              active={location.pathname === "/seller/dashboard"} 
            />
            <SidebarLink 
              to="/seller/pickups" 
              icon={<PackageCheck size={20} />} 
              label="My Pickups" 
              active={location.pathname === "/seller/pickups"} 
            />
            <SidebarLink 
              to="/seller/pickup/new" 
              icon={<PlusCircle size={20} />} 
              label="Request Pickup" 
              active={location.pathname === "/seller/pickup/new"} 
            />
          </>
        )}
        
        {user.role === 'staff' && (
          <>
            <SidebarLink 
              to="/staff/dashboard" 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={location.pathname === "/staff/dashboard"} 
            />
            <SidebarLink 
              to="/staff/pickups" 
              icon={<PackageCheck size={20} />} 
              label="Assigned Pickups" 
              active={location.pathname === "/staff/pickups"} 
            />
          </>
        )}
        
        {user.role === 'admin' && (
          <>
            <SidebarLink 
              to="/admin/dashboard" 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={location.pathname === "/admin/dashboard"} 
            />
            <SidebarLink 
              to="/admin/pickups" 
              icon={<PackageCheck size={20} />} 
              label="All Pickups" 
              active={location.pathname === "/admin/pickups"} 
            />
            <SidebarLink 
              to="/admin/staff" 
              icon={<Users size={20} />} 
              label="Staff Management" 
              active={location.pathname === "/admin/staff"} 
            />
          </>
        )}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button 
          onClick={() => logout()}
          className="w-full bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink = ({ to, icon, label, active }: SidebarLinkProps) => {
  return (
    <Link 
      to={to}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
        active 
          ? "bg-green-700 text-white" 
          : "text-gray-300 hover:bg-green-700 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default AppSidebar;
