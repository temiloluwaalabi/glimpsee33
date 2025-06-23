import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="cursor-pointer">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "dark:bg-dark-400 dark:outline-dark-300 dark:border-dark-200 cursor-pointer items-center justify-center",
          theme === "dark" ? "flex" : "hidden"
        )}
        onClick={() => setTheme("light")}
      >
        <Moon className="absolute size-[1.2rem] cursor-pointer" />

        <span className="sr-only">Toggle theme</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "dark:bg-dark-400 dark:outline-dark-300 dark:border-dark-200 flex cursor-pointer items-center justify-center",
          theme === "light" ? "flex" : "hidden"
        )}
        onClick={() => setTheme("dark")}
      >
        <Sun className="size-[1.2rem] cursor-pointer" />

        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
