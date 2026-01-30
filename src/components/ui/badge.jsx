import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "bg-[#FF7A5A] text-white",
                secondary: "bg-[#FFF8F0] text-[#FF7A5A] border border-[#FF7A5A]/20",
                destructive: "bg-red-500 text-white",
                outline: "text-[#6B6B6B] border border-gray-300",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
