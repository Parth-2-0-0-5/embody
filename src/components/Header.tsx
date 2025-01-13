import { SignUpDialog } from "./SignUpDialog";
import { FontToggle } from "./FontToggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Embody</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <FontToggle />
            <SignUpDialog />
          </div>
        </div>
      </div>
    </header>
  );
}