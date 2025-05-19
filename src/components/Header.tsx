
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { RecyclingIcon } from "./RecyclingIcon";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface HeaderProps {
  userRole?: string;
  userName?: string;
}

const Header = ({ userRole, userName }: HeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user if not provided as props
  const { data, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: !userRole && !userName, // Only fetch if props are not provided
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (userRole && userName) {
      setUser({ role: userRole, name: userName });
    }
    setIsLoading(false);
  }, [data, userRole, userName]);

  const handleLogout = async () => {
    // In a real app, this would call an API to invalidate the token
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "seller":
        return "/seller/dashboard";
      case "staff":
        return "/staff/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={user ? getDashboardLink() : "/"} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <RecyclingIcon className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-xl font-bold text-gray-900">ScrapCycle</span>
        </Link>

        <div>
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center space-x-4">
              {user.role === "seller" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/seller/pickup/new")}
                  className="hidden sm:inline-flex"
                >
                  Schedule Pickup
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full h-8 w-8">
                    <div className="flex items-center justify-center h-full w-full bg-green-100 rounded-full">
                      <UserIcon className="h-5 w-5 text-green-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {user.role === "seller" && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/seller/dashboard")}>
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/seller/pickups")}>
                        My Pickups
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/seller/pickup/new")}>
                        Schedule Pickup
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {user.role === "staff" && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/staff/dashboard")}>
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/staff/pickups")}>
                        Assigned Pickups
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/admin/pickups")}>
                        All Pickups
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/admin/staff")}>
                        Staff Management
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate("/register")}
                className="bg-green-600 hover:bg-green-700"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
