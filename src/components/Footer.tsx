
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand and Description */}
          <div className="space-y-2">
            <Link to="/" className="text-xl font-bold text-primary">
              Embody
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted companion on the journey to physical and mental wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/#features" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/#testimonials" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link 
                  to="/#contact" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 9354287664</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 7027007464</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>pa241@snu.edu.in</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Healing Street, Wellness City</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold mb-2">Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Monday - Friday: 8am - 8pm</li>
              <li>Saturday: 9am - 6pm</li>
              <li>Sunday: 10am - 4pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Embody. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
