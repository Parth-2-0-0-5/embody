
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecoveryGraphs } from "@/components/RecoveryGraphs";
import { motion } from "framer-motion";
import { SharedHeader } from "@/components/SharedHeader";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { submitMetricsToML } from "@/utils/mlIntegration";

const Recovery = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    painLevel: "",
    mobilityLevel: "",
    fatigueLevel: "",
    dailyActivity: "",
    sleepQuality: "",
    dietaryHabits: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Only allow numbers and empty string
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 10)) {
      setMetrics(prev => ({ ...prev, [name]: value }));
    } else {
      toast.error("Please enter a number between 0 and 10");
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit metrics");
      return;
    }

    try {
      const healthMetrics = {
        physical_recovery: (
          parseFloat(metrics.painLevel) +
          parseFloat(metrics.mobilityLevel) +
          parseFloat(metrics.fatigueLevel)
        ) / 3,
        mental_health: 0, // Not relevant for physical metrics
        overall_health: (
          parseFloat(metrics.sleepQuality) +
          parseFloat(metrics.dietaryHabits)
        ) / 2,
        calculator_type: 'physical' as const
      };

      await submitMetricsToML(healthMetrics, user.id);
      toast.success("Metrics submitted successfully!");
    } catch (error) {
      console.error("Error submitting metrics:", error);
      toast.error("Failed to submit metrics");
    }
  };

  const allFieldsFilled = Object.values(metrics).every(value => value !== "");

  return (
    <div className="min-h-screen flex flex-col bg-[#D3E4FD] dark:bg-gray-900">
      <SharedHeader />
      <main className="flex-grow pt-20">
        <div className="container mx-auto py-8 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent"
          >
            Recovery Tracking
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground dark:text-gray-300 mb-8"
          >
            Track your daily recovery metrics to monitor your progress
          </motion.p>
        
          <div className="grid gap-8 md:grid-cols-2 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="dark:text-white">Enter Your Metrics</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Rate each metric from 0 (lowest) to 10 (highest)
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {[
                    { id: "painLevel", label: "Pain Level" },
                    { id: "mobilityLevel", label: "Mobility Level" },
                    { id: "fatigueLevel", label: "Fatigue Level" },
                    { id: "dailyActivity", label: "Daily Activity" },
                    { id: "sleepQuality", label: "Sleep Quality" },
                    { id: "dietaryHabits", label: "Dietary Habits" },
                  ].map((field) => (
                    <div key={field.id}>
                      <Label htmlFor={field.id} className="dark:text-white">{field.label}</Label>
                      <Input
                        id={field.id}
                        name={field.id}
                        type="number"
                        min="0"
                        max="10"
                        value={metrics[field.id as keyof typeof metrics]}
                        onChange={handleInputChange}
                        placeholder="0-10"
                        className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      />
                    </div>
                  ))}
                  <Button 
                    onClick={handleSubmit}
                    disabled={!allFieldsFilled}
                    className="w-full mt-4"
                  >
                    Submit Metrics
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {allFieldsFilled && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <RecoveryGraphs metrics={metrics} calculatorType="physical" />
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recovery;
