import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Droplets, Dumbbell, Moon } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="features">
        <Features />
      </div>
      
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white">
            Daily Health Tracking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Droplets className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">Water Tracking</h3>
              </div>
              <p className="text-muted-foreground dark:text-gray-300">
                Monitor your daily hydration levels, set water intake goals, and track your progress throughout the day.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full">
                  <Dumbbell className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">Exercise Tracking</h3>
              </div>
              <p className="text-muted-foreground dark:text-gray-300">
                Record your workouts, track intensity levels, and monitor your physical activity progress over time.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  <Moon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">Sleep Tracking</h3>
              </div>
              <p className="text-muted-foreground dark:text-gray-300">
                Keep track of your sleep patterns, quality of rest, and establish better sleep habits for optimal recovery.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <div id="testimonials">
        <Testimonials />
      </div>
      
      <div id="contact" className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">Get in Touch</h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions about your recovery journey? Our team is here to help you every step of the way.
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:support@embody.com" className="text-primary hover:underline dark:text-blue-400">
              support@embody.com
            </a>
            <span className="text-muted-foreground dark:text-gray-400">|</span>
            <a href="tel:+1234567890" className="text-primary hover:underline dark:text-blue-400">
              (123) 456-7890
            </a>
          </div>
        </div>
      </div>

      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;