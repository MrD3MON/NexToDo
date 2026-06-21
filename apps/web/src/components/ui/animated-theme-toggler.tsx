import { useEffect, useState } from "react";
import { Moon, SunDim } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export type TransitionVariant =
    | "circle"
    | "square"
    | "triangle"
    | "diamond"
    | "hexagon"
    | "rectangle"
    | "star";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    duration?: number;
    variant?: TransitionVariant;
    fromCenter?: boolean;
}

export const AnimatedThemeToggler = ({
    className,
    duration,
    variant,
    fromCenter,
    ...props
}: AnimatedThemeTogglerProps) => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Default to dark theme matches the defaultTheme="dark" in __root.tsx
    const isDark = mounted ? resolvedTheme === "dark" : true;

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer overflow-hidden",
                className
            )}
            {...props}
        >
            <div className="relative h-4 w-4">
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        rotate: isDark ? 0 : -90,
                        opacity: isDark ? 1 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 18,
                    }}
                >
                    <SunDim className="h-4 w-4" />
                </motion.div>
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                        scale: isDark ? 0 : 1,
                        rotate: isDark ? 90 : 0,
                        opacity: isDark ? 0 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 18,
                    }}
                >
                    <Moon className="h-4 w-4" />
                </motion.div>
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
};
