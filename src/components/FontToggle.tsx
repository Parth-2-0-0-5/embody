import { Button } from "@/components/ui/button";
import { Type } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function FontToggle() {
  const { toast } = useToast();

  const toggleFont = () => {
    const html = document.documentElement;
    const currentFont = html.style.fontFamily;
    
    if (currentFont.includes('OpenDyslexic')) {
      html.style.fontFamily = '';
      toast({
        title: "Font Changed",
        description: "Switched to default font",
      });
    } else {
      html.style.fontFamily = 'OpenDyslexic, sans-serif';
      toast({
        title: "Font Changed",
        description: "Switched to OpenDyslexic font",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFont}
      title="Toggle Dyslexic Font"
    >
      <Type className="h-4 w-4" />
    </Button>
  );
}