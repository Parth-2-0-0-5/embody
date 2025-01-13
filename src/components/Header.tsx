import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Embody
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" asChild>
              <Link to="#features">Features</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="#testimonials">Testimonials</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="#about">About</Link>
            </Button>
            <Button>Get Started</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};