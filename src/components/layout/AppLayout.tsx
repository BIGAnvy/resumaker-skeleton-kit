
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Changed default to true
  
  // Check localStorage for saved sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);
  
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar collapsed={sidebarCollapsed} />
        
        <div className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}>
          <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
          
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
