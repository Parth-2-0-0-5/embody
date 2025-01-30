import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
      toast({
        title: "Light mode activated",
        description: "The application is now in light mode",
      });
    } else {
      html.classList.add("dark");
      setIsDark(true);
      toast({
        title: "Dark mode activated",
        description: "The application is now in dark mode",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
      title="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}