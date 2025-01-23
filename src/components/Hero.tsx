import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-gradient pt-20">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Your Journey to Recovery Starts Here
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Track your progress, connect with specialists, and take control of your physical and mental well-being with our comprehensive recovery assistance platform.
            </p>
            <Button 
              size="lg" 
              className="text-lg"
              onClick={() => navigate("/dashboard")}
            >
              Start Your Recovery Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/lovable-uploads/e2ad1f69-6676-4c42-b163-718b4e304d5a.png"
              alt="Healthcare professional with stethoscope"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};