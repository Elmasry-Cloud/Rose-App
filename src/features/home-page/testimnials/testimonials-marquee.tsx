'use client';

import { useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { Marquee } from '@/shared/components/ui/marquee';

export function TestimonialsMarquee({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-ds-bg-plain px-4 py-2 text-sm font-medium text-ds-text-plain shadow-[0_0_10px_0_#741C211A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-primary motion-reduce:hidden"
      >
        {paused ? (
          <Play aria-hidden="true" className="size-4" />
        ) : (
          <Pause aria-hidden="true" className="size-4" />
        )}
        {paused ? 'Play' : 'Pause'} testimonials
      </button>

      <div aria-hidden="true" className="w-full motion-reduce:hidden">
        <Marquee
          pauseOnHover
          repeat={4}
          className={`py-16 [--duration:30s] [--gap:0rem] ${paused ? '*:paused' : ''}`}
        >
          {children}
        </Marquee>
      </div>
    </>
  );
}
