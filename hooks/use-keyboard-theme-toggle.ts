import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export const useKeyboardThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'b') {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [theme, setTheme]);
};
