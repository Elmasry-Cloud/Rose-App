'use client';

import { cn } from '@/shared/lib/utils';
import { Monitor, Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div className="h-10 w-fit p-0.75 flex items-center text-ds-text-plain rounded-full border border-ds-border-soft bg-ds-bg-plain">
      {/* Ligh Theme */}
      <button
        onClick={() => setTheme('light')}
        aria-label="Light theme"
        className={cn(
          'theme p-1.25 cursor-pointer rounded-full transition-all',
          mounted && theme === 'light' && 'bg-ds-bg-soft'
        )}
      >
        <SunMedium size={24} />
      </button>

      {/* System Theme */}
      <button
        onClick={() => setTheme('system')}
        aria-label="System theme"
        className={cn(
          'theme p-1.25 cursor-pointer rounded-full transition-all',
          mounted && theme === 'system' && 'bg-ds-bg-soft'
        )}
      >
        <Monitor size={24} />
      </button>

      {/* Dark Theme */}
      <button
        onClick={() => setTheme('dark')}
        aria-label="Dark theme"
        className={cn(
          'theme p-1.25 cursor-pointer rounded-full transition-all',
          mounted && theme === 'dark' && 'bg-ds-bg-muted'
        )}
      >
        <Moon size={24} />
      </button>
    </div>
  );
}
