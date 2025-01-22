import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string; // Custom class support
  ariaLabel?: string; // Accessibility label
}

export const Spinner = ({
  size,
  className,
  ariaLabel = "Loading"
}: SpinnerProps) => {
  return (
    <Loader
      className={cn(spinnerVariants({ size }), className)}
      aria-label={ariaLabel}
      role="status" // Important for assistive technologies
    />
  );
};
