import React, { useState } from "react";
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

const Recovery = () => {
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
    const numValue = parseInt(value);
    
    if ((numValue >= 0 && numValue <= 10) || value === "") {
      setMetrics(prev => ({ ...prev, [name]: value }));
    } else {
      toast.error("Please enter a number between 0 and 10");
    }
  };

  const allFieldsFilled = Object.values(metrics).every(value => value !== "");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-64 wave-animation opacity-20 -z-10" />

      <div className="container mx-auto py-8 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        >
          Recovery Tracking
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-8"
        >
          Track your daily recovery metrics to monitor your progress
        </motion.p>
      
        <div className="grid gap-8 md:grid-cols-2 relative">
          {/* Background wave effect */}
          <div className="absolute inset-0 wave-animation-alt opacity-10 rounded-3xl -z-10" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="backdrop-blur-sm bg-white/50">
              <CardHeader>
                <CardTitle>Enter Your Metrics</CardTitle>
                <CardDescription>
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
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type="number"
                      min="0"
                      max="10"
                      value={metrics[field.id as keyof typeof metrics]}
                      onChange={handleInputChange}
                      placeholder="0-10"
                      className="mt-1"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {allFieldsFilled && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <RecoveryGraphs metrics={metrics} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-64 wave-animation opacity-20 -z-10" />
    </div>
  );
};

export default Recovery;