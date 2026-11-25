'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-ds-text-success" />,
        info: <InfoIcon className="size-4 text-ds-text-info" />,
        warning: <TriangleAlertIcon className="size-4 text-ds-text-warning" />,
        error: <OctagonXIcon className="size-4 text-ds-text-danger" />,
        loading: <Loader2Icon className="size-4 animate-spin text-ds-text-primary" />,
      }}
      style={
        {
          '--normal-bg': 'var(--color-ds-bg-primary)',
          '--normal-text': 'var(--color-ds-text-inverse)',
          '--normal-border': 'var(--color-ds-border-muted)',
          '--border-radius': '0.5rem',
          zIndex: 9999,
        } as React.CSSProperties
      }

      toastOptions={{
        classNames: {
          toast: 'cn-toast',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
