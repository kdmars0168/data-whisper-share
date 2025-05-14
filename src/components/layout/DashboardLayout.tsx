
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart2, 
  Upload, 
  Share2, 
  User, 
  LogOut, 
  Home,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
};

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={to} className="w-full">
          <Button
            variant="ghost"
            size="default"
            className={cn(
              "w-full justify-start gap-3 px-3",
              active ? "bg-brand-purple/10 text-brand-purple font-medium" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r border-border p-4 flex flex-col shadow-sm">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold text-brand-purple">DataWhisper</h1>
          <p className="text-xs text-muted-foreground">Personal Data Analytics</p>
        </div>
        
        <nav className="space-y-1 flex-1">
          <NavItem 
            icon={Home} 
            label="Dashboard" 
            to="/dashboard" 
            active={location.pathname === "/dashboard"}
          />
          <NavItem 
            icon={Upload} 
            label="Upload Data" 
            to="/upload" 
            active={location.pathname === "/upload"}
          />
          <NavItem 
            icon={BarChart2} 
            label="Visualizations" 
            to="/visualize" 
            active={location.pathname === "/visualize"}
          />
          <NavItem 
            icon={Share2} 
            label="Share" 
            to="/share" 
            active={location.pathname === "/share"}
          />
          <NavItem 
            icon={Users} 
            label="Shared With Me" 
            to="/shared-with-me" 
            active={location.pathname === "/shared-with-me"}
          />
          <NavItem 
            icon={User} 
            label="Profile" 
            to="/profile" 
            active={location.pathname === "/profile"}
          />
        </nav>
        
        <div className="mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
