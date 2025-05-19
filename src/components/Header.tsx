
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellIcon, SearchIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome to Scrapy Collect</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-[250px] bg-gray-50 border-gray-200"
          />
        </div>

        <Button variant="outline" size="icon" className="relative">
          <BellIcon size={18} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-scraper-600 text-white flex items-center justify-center">
            JD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
