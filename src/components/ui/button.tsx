import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-brutal-md text-sm font-medium border-2 border-foreground transition-all disabled:pointer-events-none disabled:opacity-70 disabled:bg-[#4D6169] disabled:text-[#EEEAE0]/60 disabled:shadow-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-['Roboto_Mono',monospace]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-brutal-md hover:bg-[#D0786B] active:bg-[#C65D4D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-brutal-md hover:bg-[#C24E3E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "bg-background text-foreground hover:bg-secondary active:bg-accent active:translate-x-[2px] active:translate-y-[2px]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#E0D9C7] active:bg-accent active:translate-x-[2px] active:translate-y-[2px]",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground shadow-none active:bg-muted",
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-brutal-sm gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-brutal-md px-8 has-[>svg]:px-5 text-base",
        icon: "size-10 rounded-brutal-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
