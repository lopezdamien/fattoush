import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Note: I haven't installed class-variance-authority or radix-ui slot yet.
// I should use standard props or install them. 
// For now, I will implement a simple button without cva/slot dependencies to avoid extra installs unless necessary, 
// or I will install them given they are standard in modern Next.js stacks (shadcn/ui).
// The user didn't explicitly ask for shadcn/ui but "modern web design".
// I'll stick to simple implementation first to keep it lightweight, or better yet, install cva.
// Actually, I'll use a simple implementation for now to avoid dependency boat, but robust enough.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-primary text-white hover:bg-primary/90",
            secondary: "bg-secondary text-foreground hover:bg-secondary/80",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
        };

        const sizes = {
            sm: "h-9 px-3 rounded-md text-xs",
            md: "h-10 px-4 py-2 rounded-md",
            lg: "h-11 px-8 rounded-md text-lg",
        };

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
