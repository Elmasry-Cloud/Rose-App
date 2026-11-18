'use client';

import { cn } from '@/shared/lib/utils';
import { Monitor, Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    });
  }, []);

  const systemBg = resolvedTheme === 'dark' ? 'bg-ds-bg-muted' : 'bg-ds-bg-soft';

  return (
    <div className="h-10 w-fit p-0.75 flex items-center gap-1 text-ds-text-plain rounded-full border border-ds-border-soft bg-ds-bg-plain">
      {/* Ligh Theme */}
      <button
        onClick={() => setTheme('light')}
        aria-label="Light theme"
        className={cn(
          'theme p-1.25 cursor-pointer rounded-full transition-all hover:bg-ds-bg-soft',
          mounted && theme === 'light' && 'bg-ds-bg-soft'
        )}
      >
        <SunMedium size={20} />
      </button>

      {/* System Theme */}
      <button
        onClick={() => setTheme('system')}
        aria-label="System theme"
        className={cn(
          'theme p-1.25 cursor-pointer rounded-full transition-all',
          resolvedTheme === 'dark' ? 'hover:bg-ds-bg-muted' : 'hover:bg-ds-bg-soft',
          mounted && theme === 'system' && systemBg
        )}
      >
        <Monitor size={20} />
      </button>

      {/* Dark Theme */}
      <button
        onClick={() => setTheme('dark')}
        aria-label="Dark theme"
        className={cn(
          'theme p-1.25 cursor-pointer rounded-full transition-all hover:bg-ds-bg-muted',
          mounted && theme === 'dark' && 'bg-ds-bg-muted'
        )}
      >
        <Moon size={20} />
      </button>
    </div>
  );
}
