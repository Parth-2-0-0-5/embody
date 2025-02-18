
import { Button } from "@/components/ui/button";
import { AuthForm } from "./AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const CallToAction = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="hero-gradient py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of others who have transformed their health journey with our comprehensive tracking system.
        </p>
        {isAuthenticated ? (
          <Button 
            size="lg" 
            className="text-lg"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        ) : (
          <Button
            size="lg"
            className="text-lg"
            onClick={() => {
              const authButton = document.querySelector('[aria-label="Sign In / Sign Up"]') as HTMLButtonElement;
              if (authButton) {
                authButton.click();
              }
            }}
          >
            Start Your Journey Today
          </Button>
        )}
      </div>
    </section>
  );
};
