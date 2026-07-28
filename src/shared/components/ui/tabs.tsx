'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn('group/tabs flex gap-2 data-horizontal:flex-col', className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  'group/tabs-list inline-flex w-fit items-center justify-center rounded-lg overflow-hidden border border-ds-border-soft group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none data-[variant=line]:border-0',
  {
    variants: {
      variant: {
        default: '',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function TabsList({
  className,
  variant = 'default',
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        // Base
        'relative inline-flex w-36.75 h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium whitespace-nowrap transition-all cursor-pointer',

        // Default
        'text-ds-text-plain bg-ds-bg-plain',

        // Group Vertical
        'group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start',
        'group-data-[variant=default]/tabs-list:hover:bg-ds-bg-primary-saturated',
        'group-data-[variant=default]/tabs-list:hover:text-ds-text-inverse',

        // Focus
        'focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ds-border-primary',

        // Disabled
        'disabled:pointer-events-none disabled:text-ds-text-muted disabled:bg-ds-bg-muted aria-disabled:border-transparent aria-disabled:pointer-events-none aria-disabled:bg-ds-bg-muted aria-disabled:text-ds-text-muted',

        // Icons
        'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',

        // SVG
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // Active
        'data-active:bg-ds-bg-primary data-active:text-ds-text-inverse',
        'group-data-[variant=default]/tabs-list:data-active:shadow-sm',
        'group-data-[variant=line]/tabs-list:data-active:shadow-none',

        // Dark
        'dark:text-muted-foreground dark:hover:text-foreground',
        'dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground',

        // Variant Line
        'group-data-[variant=line]/tabs-list:bg-transparent',
        'group-data-[variant=line]/tabs-list:data-active:bg-transparent',
        'dark:group-data-[variant=line]/tabs-list:data-active:border-transparent',
        'dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',

        // After (Line indicator)
        'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity',
        'group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-1.25 group-data-horizontal/tabs:after:h-0.5',
        'group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5',
        'group-data-[variant=line]/tabs-list:data-active:after:opacity-100'
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
