'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { cn } from '@/shared/lib/utils';
import { CheckIcon } from 'lucide-react';

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        'peer relative flex size-5 shrink-0 items-center justify-center rounded-lg border',

        // Default
        'border-ds-border-primary bg-ds-bg-plain outline-none',
        'shadow-xs transition-shadow after:absolute after:-inset-x-3 after:-inset-y-2',

        // Disabled
        'group-has-disabled/field:opacity-50 disabled:cursor-not-allowed disabled:opacity-50',

        // Focus
        'focus:[box-shadow:var(--ring-default)] ',

        // Invalid
        'aria-invalid:border-ds-border-danger aria-invalid:ring-1 aria-invalid:ring-ds-border-danger aria-invalid:aria-checked:border-ds-border-primary',

        // Checked
        'data-checked:border-ds-border-primary data-checked:bg-ds-bg-primary data-checked:text-ds-text-inverse data-checked:aria-invalid:ring-ds-border-primary',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-4"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
