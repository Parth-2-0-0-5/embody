import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Brain, Dumbbell, Moon, Star, Heart, Shield, Users, Clock, Zap } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const Index = () => {
  React.useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '20px'
    });

    document.querySelectorAll('.fade-up, .slide-in, .image-fade, .section-transition').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="features">
        <Features />
      </div>
      
      <section className="py-12 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
                Expert Care and Guidance for Your Recovery Journey
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-300">
                Our team of healthcare professionals provides personalized care and guidance throughout your recovery journey. We understand that each patient's needs are unique, and we tailor our approach to ensure optimal results.
              </p>
              <p className="text-lg text-muted-foreground dark:text-gray-300">
                Regular consultations and progress monitoring ensure you're on the right path to recovery. Our advanced tracking systems help identify areas of improvement and celebrate your successes along the way.
              </p>
              <p className="text-lg text-muted-foreground dark:text-gray-300">
                With real-time feedback and adjustments to your care plan, we help you achieve your health goals efficiently and sustainably. Our comprehensive approach combines traditional methods with cutting-edge technology to optimize your recovery process.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="/lovable-uploads/50b5a2ea-fcff-4258-a137-3fa7db69fe87.png"
                alt="Healthcare consultation"
                className="w-full max-w-xl mx-auto h-auto rounded-xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white">
            Holistic Health Tracking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  <Brain className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">Mental Health</h3>
              </div>
              <p className="text-muted-foreground dark:text-gray-300">
                Track your mental well-being, stress levels, and emotional state with our AI-powered analysis.
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
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Moon className="w-6 h-6 text-blue-500" />
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

      <section className="py-20 bg-gradient-to-b from-white/0 to-primary/5 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">
            Why Choose Embody?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-6 h-6 text-yellow-500" />,
                title: "Expert Guidance",
                description: "Get personalized recommendations from health professionals"
              },
              {
                icon: <Heart className="w-6 h-6 text-red-500" />,
                title: "Holistic Approach",
                description: "Focus on both physical and mental well-being"
              },
              {
                icon: <Shield className="w-6 h-6 text-green-500" />,
                title: "Data Security",
                description: "Your health data is encrypted and secure"
              },
              {
                icon: <Users className="w-6 h-6 text-blue-500" />,
                title: "Community Support",
                description: "Connect with others on similar health journeys"
              },
              {
                icon: <Clock className="w-6 h-6 text-purple-500" />,
                title: "24/7 Monitoring",
                description: "Track your progress anytime, anywhere"
              },
              {
                icon: <Zap className="w-6 h-6 text-orange-500" />,
                title: "AI-Powered Insights",
                description: "Get intelligent health insights and predictions"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/80 dark:bg-gray-600/50 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div id="testimonials">
        <Testimonials />
      </div>
      
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white">
            Our Commitment to Your Health
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground dark:text-gray-300 mb-8">
              At Embody, we believe in a comprehensive approach to health and wellness. Our platform is designed to support you throughout your journey to better health, whether you're recovering from an injury, managing stress, or working to improve your overall well-being.
            </p>
            <p className="text-lg text-muted-foreground dark:text-gray-300">
              With advanced tracking tools, personalized insights, and a supportive community, we're here to help you achieve your health goals and maintain a balanced lifestyle.
            </p>
          </div>
        </div>
      </section>

      <div id="contact" className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">Get in Touch</h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions about your recovery journey? Our team is here to help you every step of the way.
          </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:pa241@snu.edu.in" className="text-primary hover:underline dark:text-blue-400">
              pa241@snu.edu.in
            </a>
            <span className="text-muted-foreground dark:text-gray-400">|</span>
            <a href="tel:+919354287664" className="text-primary hover:underline dark:text-blue-400">
              +91 9354287664
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
