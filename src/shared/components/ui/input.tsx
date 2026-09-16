'use client';
import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/shared/lib/utils';
import { EyeIcon, EyeOff, Search, Upload } from 'lucide-react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  // State
  const [showPassword, setShowPassword] = React.useState(false);

  // File State
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isPassword = type === 'password';

  // Search
  const isSearch = type === 'search';

  // File
  const isFile = type === 'file';

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    const accepted = ['.pdf', '.png', '.jpg', '.jpeg'];
    const valid = accepted.some((a) => file.name.endsWith(a));
    if (!valid) return;

    if (file.size > 5 * 1024 * 1024) return;

    setFileName(file.name);
  };

  // Input Type
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div
      className="relative w-full"
      onDragOver={
        isFile
          ? (e) => {
              e.preventDefault();
              setIsDragging(true);
            }
          : undefined
      }
      onDragLeave={isFile ? () => setIsDragging(false) : undefined}
      onDrop={
        isFile
          ? (e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file && inputRef.current) {
                const dt = new DataTransfer();
                dt.items.add(file);
                inputRef.current.files = dt.files;
                inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
              }
              handleFile(file);
            }
          : undefined
      }
    >
      <InputPrimitive
        ref={inputRef}
        type={inputType}
        data-slot="input"
        onChange={(e) => {
          if (isFile) {
            if (e.target.files?.[0]) {
              handleFile(e.target.files[0]);
            } else {
              setFileName(null);
            }
          }
          props.onChange?.(e);
        }}
        className={cn(
          // Base
          'h-12.25 w-full rounded-lg border p-4 font-normal text-sm shadow-xs transition-[color,box-shadow] outline-none',

          // Default
          'border-ds-border-soft bg-ds-bg-plain text-ds-text-plain',

          // Placeholder
          'placeholder:text-ds-text-muted',

          // Search
          isSearch && 'ps-10.5',

          // File
          isFile && 'cursor-pointer file:hidden text-transparent',
          isFile && isDragging && 'border-ds-border-primary [box-shadow:var(--ring-default)]',

          // Hover
          'hover:border-ds-border-default not-disabled:hover:[box-shadow:var(--ring-default)]',

          // Disabled
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-ds-bg-muted disabled:text-ds-text-muted disabled:border-transparent',

          // Invalid
          'aria-invalid:not-disabled:border-ds-border-danger aria-invalid:not-disabled:[box-shadow:var(--ring-danger)]',

          // Focus
          'focus-visible:border-ds-border-primary focus-visible:[box-shadow:var(--ring-default)]',

          className
        )}
        {...props}
      />

      {/* Search Icon */}
      {isSearch && (
        <button
          type="button"
          disabled={props.disabled}
          className={cn(
            // Default
            'absolute text-ds-text-muted inset-s-4 top-1/2 -translate-y-1/2'
          )}
        >
          <Search size={18} strokeWidth={1.5} />
        </button>
      )}

      {/* File */}
      {isFile && (
        <div className="absolute inset-y-0 inset-e-4 flex items-center pointer-events-none">
          <span
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium',
              fileName ? 'text-ds-text-plain' : 'text-ds-text-primary',
              props.disabled && 'text-ds-text-muted'
            )}
          >
            {!fileName && <Upload size={16} strokeWidth={1.5} />}
            {fileName ?? 'Upload file'}
          </span>
        </div>
      )}

      {/* Show & Hide Password Icon */}
      {isPassword && (
        <button
          type="button"
          disabled={props.disabled}
          className={cn(
            // Default
            'absolute text-ds-text-muted inset-e-3.5 top-1/2 -translate-y-1/2',

            // Hover
            'not-disabled:hover:text-ds-text-default cursor-pointer',

            // Disabled
            'disabled:pointer-events-none'
          )}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {!showPassword ? (
            <EyeOff size={20} strokeWidth={1.5} />
          ) : (
            <EyeIcon size={20} strokeWidth={1.5} />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
