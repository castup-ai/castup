import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                default: "bg-[#FF7A5A] text-white hover:bg-[#FF6A4A] shadow-lg shadow-[#FF7A5A]/20",
                destructive: "bg-red-500 text-white hover:bg-red-600",
                outline: "border border-gray-300 bg-white hover:bg-gray-50 text-[#3C3C3C]",
                secondary: "bg-[#FFF8F0] text-[#FF7A5A] hover:bg-[#FFE5DD]",
                ghost: "hover:bg-[#FFF8F0] text-[#6B6B6B] hover:text-[#3C3C3C]",
                link: "text-[#FF7A5A] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-xl px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button, buttonVariants };
