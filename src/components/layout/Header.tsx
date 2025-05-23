
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User, Search, HelpCircle, X, LogOut, Settings } from 'lucide-react';
import ThemeToggle from '../theme/ThemeToggle';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type HeaderProps = {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
};

const Header = ({ toggleSidebar, sidebarCollapsed }: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <header className="border-b h-14 flex items-center justify-between px-4 bg-card">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">{sidebarCollapsed ? 'Show' : 'Hide'} sidebar</span>
        </Button>
        
        <div className="hidden md:flex">
          <img src="/logo.svg" alt="Resumaker" className="h-8" />
        </div>
      </div>
      
      <div className={`
        absolute left-0 right-0 top-0 bg-background z-10 p-2
        ${showSearch ? 'flex items-center h-14' : 'hidden'}
        md:static md:bg-transparent md:p-0 md:flex md:w-1/3 md:max-w-md
      `}>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resumes, templates..." 
            className="h-9 pl-10 pr-10"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 md:hidden" 
            onClick={() => setShowSearch(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSearch(true)}
            className="h-9 w-9"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Help & Resources</SheetTitle>
              <SheetDescription>
                Get help with Resumaker and access learning resources.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Button variant="outline" className="justify-start">
                View tutorials
              </Button>
              <Button variant="outline" className="justify-start">
                Resume writing tips
              </Button>
              <Button variant="outline" className="justify-start">
                Contact support
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex justify-between items-center p-2">
              <span className="font-medium">Notifications</span>
              <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <div className="p-4 text-sm border-l-2 border-primary bg-muted/50">
                <p className="font-medium">Resume template suggestions available</p>
                <p className="text-muted-foreground text-xs mt-1">Based on your profile, we've suggested new templates.</p>
                <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
              </div>
              
              <div className="p-4 text-sm">
                <p className="font-medium">Autosave complete</p>
                <p className="text-muted-foreground text-xs mt-1">Your resume "Software Developer" was saved.</p>
                <p className="text-xs text-muted-foreground mt-2">Yesterday</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2 text-center">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">John Doe</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
