
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BellIcon, 
  SearchIcon, 
  UserIcon, 
  PackageIcon,
  TruckIcon,
  CalendarIcon,
  MapPinIcon,
  SettingsIcon
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  userRole?: 'seller' | 'staff' | 'admin' | undefined;
  userName?: string;
}

const Header = ({ userRole = undefined, userName = "Guest" }: HeaderProps) => {
  // This would be replaced with actual notification data from backend
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Get first letter of first and last name for avatar
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const userInitials = getInitials(userName);
  
  // Different title based on user role
  const getHeaderTitle = () => {
    switch(userRole) {
      case 'seller':
        return 'Seller Dashboard';
      case 'staff':
        return 'Staff Portal';
      case 'admin':
        return 'Admin Control Panel';
      default:
        return 'ScrapCycle';
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800">{getHeaderTitle()}</h1>
        <p className="text-sm text-gray-500">Recycling made easy</p>
      </div>
      
      <div className="flex items-center space-x-4">
        {userRole && (
          <>
            <div className="relative">
              <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search pickups..." 
                className="pl-10 w-[250px] bg-gray-50 border-gray-200"
              />
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Quick Actions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[220px]">
                      {userRole === 'seller' && (
                        <>
                          <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md">
                            <CalendarIcon size={16} />
                            <span>Schedule Pickup</span>
                          </NavigationMenuLink>
                          <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md">
                            <PackageIcon size={16} />
                            <span>My Pickups</span>
                          </NavigationMenuLink>
                        </>
                      )}
                      
                      {userRole === 'staff' && (
                        <>
                          <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md">
                            <TruckIcon size={16} />
                            <span>Today's Routes</span>
                          </NavigationMenuLink>
                          <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md">
                            <MapPinIcon size={16} />
                            <span>Map View</span>
                          </NavigationMenuLink>
                        </>
                      )}
                      
                      {userRole === 'admin' && (
                        <>
                          <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md">
                            <UserIcon size={16} />
                            <span>Manage Staff</span>
                          </NavigationMenuLink>
                          <NavigationMenuLink className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md">
                            <SettingsIcon size={16} />
                            <span>System Settings</span>
                          </NavigationMenuLink>
                        </>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button variant="outline" size="icon" className="relative">
              <BellIcon size={18} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </>
        )}
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            {userRole ? userInitials : <UserIcon size={16} />}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Guest'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
