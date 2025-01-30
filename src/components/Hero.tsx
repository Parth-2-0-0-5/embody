import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-gradient dark:bg-gray-900">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-primary dark:text-white mb-6"
            >
              Your Journey to Recovery Starts Here
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground dark:text-gray-300 mb-8"
            >
              Track your progress, connect with specialists, and take control of your physical and mental well-being with our comprehensive recovery assistance platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="text-lg hover-scale dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                onClick={() => navigate("/dashboard")}
              >
                Start Your Recovery Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <img
              src="/lovable-uploads/e2ad1f69-6676-4c42-b163-718b4e304d5a.png"
              alt="Healthcare professional with stethoscope"
              className="w-full max-w-md object-contain floating-animation"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "24/7 Support", value: "Always here" },
            { title: "Recovery Rate", value: "95%" },
            { title: "Happy Patients", value: "10,000+" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center hover-scale">
              <h3 className="text-2xl font-bold text-primary dark:text-white">{stat.value}</h3>
              <p className="text-muted-foreground dark:text-gray-300">{stat.title}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};