import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';
import { LoaderCircle } from 'lucide-react';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg cursor-pointer border border-transparent bg-clip-padding text-base font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:bg-ds-bg-soft disabled:text-ds-text-muted aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'border-ds-border-soft bg-ds-bg-muted text-ds-text-primary hover:bg-ds-bg-subtle text-[var(--text-plain)]',

        primary: 'bg-ds-bg-primary text-ds-text-inverse hover:bg-ds-bg-primary-saturated',

        outline:
          'border-ds-border-primary bg-ds-bg-plain text-ds-text-primary hover:bg-ds-bg-primary-fade disabled:border-transparent',

        secondary:
          'bg-ds-bg-primary-fade text-ds-text-primary hover:bg-ds-bg-primary-faint text-[var(--text-plain)]',

        ghost: 'bg-ds-bg-plain hover:bg-ds-bg-soft bg-ds-bg-subtle hover:bg-ds-bg-plain',

        destructive: 'bg-ds-bg-danger hover:bg-ds-bg-danger-saturated text-ds-text-inverse',

        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'w-45 gap-1.5 px-4 py-3.5',
        icon: 'size-9',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface IButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

function Button({
  className,
  isLoading = false,
  loadingText = 'loading...',
  children,
  disabled,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & IButtonProps) {
  return (
    <ButtonPrimitive
      disabled={disabled || isLoading}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="inline-flex items-center gap-2">
        {isLoading ? loadingText : children}
        {isLoading && <LoaderCircle className="animate-spin" />}
      </span>
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
