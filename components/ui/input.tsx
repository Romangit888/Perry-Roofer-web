import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-14 w-full rounded-xl border border-ink/15 bg-white px-5 text-base text-ink placeholder:text-ink/40 shadow-sm transition-colors focus:border-copper-500 focus:outline-none focus:ring-4 focus:ring-copper-500/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
