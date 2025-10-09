"use client";

import * as React from "react";
// Assuming OTPInput and OTPInputContext are correctly imported from the library
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

// Mock implementation of cn utility function for runnable code
const cn = (...inputs: (string | false | null | undefined)[]) => {
  return inputs.filter(Boolean).join(" ");
};

// Define the expected shape of the context to satisfy TypeScript
interface OTPContextValue {
  slots: {
    char: string;
    hasFakeCaret: boolean;
    isActive: boolean;
  }[];
}

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  // Use a type assertion to instruct TypeScript on the expected structure.
  // This resolves TS2339 by informing the compiler that 'slots' exists when context is present.
  const inputOTPContext = React.useContext(OTPInputContext) as unknown as (OTPContextValue | undefined);
  
  // Safely destructure by using optional chaining on 'slots' as well, 
  // and providing explicit default values for robustness.
  const slotData = inputOTPContext?.slots?.[index];
  
  const char = slotData?.char ?? '';
  const hasFakeCaret = slotData?.hasFakeCaret ?? false;
  const isActive = slotData?.isActive ?? false;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" className={cn("flex items-center", className)} {...props}>
      <MinusIcon className="h-4 w-4" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
