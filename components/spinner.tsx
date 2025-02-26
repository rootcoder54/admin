import { cva, type VariantProps } from "class-variance-authority";
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
    <div>
      <svg
        className={cn(
          "mr-3 -ml-1 size-5 animate-spin text-white",
          spinnerVariants({ size }),
          className
        )}
        aria-label={ariaLabel}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
