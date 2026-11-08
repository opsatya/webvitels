import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/**
 * WebVitels button system - deliberately small:
 *  - default:   ink on light surfaces, pass-green on dark: the one primary action
 *  - secondary: solid ink (inverts to paper on dark surfaces)
 *  - outline:   quiet secondary action
 *  - ghost/link: utility actions
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent font-sans font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-300 ease-out-quint outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        outline:
          "border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/5",
        ghost: "text-foreground hover:bg-foreground/8",
        link: "h-auto px-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-3.5 text-[0.8125rem]",
        lg: "h-13 px-6 text-[0.9375rem] sm:h-14 sm:px-7",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
