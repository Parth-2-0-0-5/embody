import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="hero-gradient">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Your Journey to Recovery Starts Here
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Track your progress, connect with specialists, and take control of your physical and mental well-being with our comprehensive recovery assistance platform.
          </p>
          <Button size="lg" className="text-lg">
            Start Your Recovery Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};