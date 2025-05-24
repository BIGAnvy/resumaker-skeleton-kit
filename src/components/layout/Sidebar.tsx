
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HomeIcon, User, FileText, Mail, Settings, Bot } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type SidebarProps = {
  collapsed: boolean;
};

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed: boolean;
};

const NavItem = ({ icon: Icon, label, href, active = false, collapsed }: NavItemProps) => (
  <Link 
    to={href}
    className={cn(
      "flex items-center h-10 px-3 py-2 rounded-md text-sm font-medium transition-colors",
      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
      collapsed ? "justify-center" : ""
    )}
  >
    <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
    {!collapsed && <span>{label}</span>}
  </Link>
);

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={cn("resumaker-sidebar", collapsed && "collapsed")}>
      <div className="flex flex-col h-full">
        {!collapsed && (
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-xl text-resumaker-700">Resumaker</h2>
          </div>
        )}
        
        <nav className="p-2 space-y-1 flex-1">
          <NavItem 
            icon={HomeIcon} 
            label="Dashboard" 
            href="/dashboard" 
            active={isActive("/dashboard")} 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={FileText} 
            label="Resumes" 
            href="/resumes" 
            active={isActive("/resumes")} 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={Bot} 
            label="AI Resume" 
            href="/ai-resume" 
            active={isActive("/ai-resume")} 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={Mail} 
            label="Cover Letters" 
            href="/cover-letters" 
            active={isActive("/cover-letters")} 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={User} 
            label="Profile" 
            href="/profile" 
            active={isActive("/profile")} 
            collapsed={collapsed} 
          />
          <NavItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            active={isActive("/settings")} 
            collapsed={collapsed} 
          />
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          {!collapsed ? (
            <div className="text-xs text-muted-foreground">
              <p>Free Plan</p>
              <p>2/3 Resumes used</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-2 w-2/3 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-resumaker-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
