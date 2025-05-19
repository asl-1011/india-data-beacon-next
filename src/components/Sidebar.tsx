
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Database, 
  Settings, 
  FileCode, 
  PlusCircle, 
  LayoutDashboard, 
  Monitor, 
  History 
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-scraper-800 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center space-x-2 mb-6">
        <FileCode size={24} className="text-scraper-400" />
        <h1 className="text-xl font-bold">Scrapy Collect</h1>
      </div>

      <Separator className="my-4 bg-scraper-700" />
      
      <nav className="space-y-1">
        <SidebarLink to="/" icon={<Home size={20} />} label="Home" active />
        <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <SidebarLink to="/scraper" icon={<Database size={20} />} label="Scrapers" />
        <SidebarLink to="/monitoring" icon={<Monitor size={20} />} label="Monitoring" />
        <SidebarLink to="/history" icon={<History size={20} />} label="History" />
        <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" />
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button className="w-full bg-scraper-500 hover:bg-scraper-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors">
          <PlusCircle size={18} />
          <span>New Scraper</span>
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
          ? "bg-scraper-700 text-white" 
          : "text-gray-300 hover:bg-scraper-700 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
