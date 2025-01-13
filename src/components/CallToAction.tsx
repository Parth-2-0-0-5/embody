import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="hero-gradient py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Your Recovery Journey?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of others who have transformed their recovery experience with our comprehensive support system.
        </p>
        <Button size="lg" className="text-lg">
          Get Started Now
        </Button>
      </div>
    </section>
  );
};