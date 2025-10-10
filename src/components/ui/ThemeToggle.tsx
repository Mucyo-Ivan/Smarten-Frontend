import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Immediate theme switching with visual feedback
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg hover:bg-accent transition-colors duration-100 theme-instant"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-100" />
      ) : (
        <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-100" />
      )}
    </button>
  );
};

export default ThemeToggle;
