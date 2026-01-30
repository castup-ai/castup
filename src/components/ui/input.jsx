import * as React from "react";
import { cn } from "./utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-[#3C3C3C] placeholder:text-[#6B6B6B] transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A5A] focus-visible:border-[#FF7A5A]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
