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

const ExerciseTracking = () => {
  const [metrics, setMetrics] = useState({
    exerciseTime: "",
    intensity: "",
    heartRate: "",
    caloriesBurned: "",
    muscleStrain: "",
    energyLevel: "",
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
    <div className="min-h-screen bg-[#D3E4FD] dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          Exercise Tracking
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground dark:text-gray-300 mb-8"
        >
          Track your daily exercise metrics
        </motion.p>
      
        <div className="grid gap-8 md:grid-cols-2">
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
                  { id: "exerciseTime", label: "Exercise Duration" },
                  { id: "intensity", label: "Workout Intensity" },
                  { id: "heartRate", label: "Heart Rate Level" },
                  { id: "caloriesBurned", label: "Calories Burned" },
                  { id: "muscleStrain", label: "Muscle Strain" },
                  { id: "energyLevel", label: "Energy Level" },
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
    </div>
  );
};

export default ExerciseTracking;