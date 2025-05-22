
import { Moon, Sun, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  
  useEffect(() => {
    // Check if theme is already stored
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);
  
  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
  };
  
  const setThemePreference = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };
  
  const getIcon = () => {
    if (theme === 'light') return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    if (theme === 'dark') return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    return <Laptop className="h-[1.2rem] w-[1.2rem]" />;
  };
  
  // Add event listener for system theme change
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        applyTheme('system');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemePreference('light')}>
          <Sun className="h-4 w-4 mr-2" />
          <span>Light</span>
          {theme === 'light' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemePreference('dark')}>
          <Moon className="h-4 w-4 mr-2" />
          <span>Dark</span>
          {theme === 'dark' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemePreference('system')}>
          <Laptop className="h-4 w-4 mr-2" />
          <span>System</span>
          {theme === 'system' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Check } from 'lucide-react';

export default ThemeToggle;
