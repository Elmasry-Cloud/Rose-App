'use client';
import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Button } from '@/shared/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { cn } from '@/shared/lib/utils';
import { useLocale } from 'next-intl';

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, value, ...props }, ref) => {
  // Get Locale
  const locale = useLocale();

  return (
    <RPNInput.default
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      ref={ref}
      className={cn(
        // Base
        'flex h-12.25 w-full rounded-lg border overflow-hidden',

        // Default
        'border-ds-border-soft bg-ds-bg-plain',

        // Hover
        'hover:border-ds-border-default hover:not-has-disabled:[box-shadow:var(--ring-default)]',

        // Focus (triggers when button or input inside gets focus)
        'has-focus-visible:border-ds-border-primary has-focus-visible:[box-shadow:var(--ring-default)]',

        // Invalid
        'has-aria-invalid:border-ds-border-danger has-aria-invalid:[box-shadow:var(--ring-danger)]',

        // Disabled
        'has-disabled:bg-ds-bg-muted has-disabled:border-transparent',
        className
      )}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      value={value || undefined}
      defaultCountry="EG"
      // international
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
      {...props}
    />
  );
});
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn(
        // Base
        'h-full w-full border-0 rounded-none p-4 font-normal text-sm bg-transparent',

        // Default
        'text-ds-text-plain',

        // Placeholder
        'placeholder:text-ds-text-muted',

        // Disabled
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-ds-text-muted',

        // Focus (handled by wrapper, disable local ring)
        'focus-visible:ring-0 focus-visible:ring-offset-0',
        className
      )}
      {...props}
      ref={ref}
    />
  )
);
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue('');
      }}
    >
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className={cn(
              // Base
              'flex items-center gap-2 h-full w-fit border-0 border-e border-ds-border-soft rounded-none px-6',

              // Default
              'bg-transparent',

              // Focus (handled by wrapper, disable local ring)
              'focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',

              // Disabled
              'disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-ds-text-muted'
            )}
            disabled={disabled}
          >
            <FlagComponent country={selectedCountry} countryName={selectedCountry} />
            {selectedCountry && (
              <span className="text-sm text-foreground/70">
                {`+${RPNInput.getCountryCallingCode(selectedCountry)}`}
              </span>
            )}
            <ChevronsUpDown
              className={cn('-mr-2 size-4 text-ds-text-plain', disabled ? 'hidden' : 'opacity-100')}
            />
          </Button>
        }
      />

      {/* Popover Content */}
      <PopoverContent className="w-75 p-0 bg-ds-bg-plain text-ds-text-plain border-ds-border-soft">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    '[data-radix-scroll-area-viewport]'
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
      />
    </CommandItem>
  );
};

// Flag
const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex items-center justify-center h-4 w-4 overflow-hidden rounded-full [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
