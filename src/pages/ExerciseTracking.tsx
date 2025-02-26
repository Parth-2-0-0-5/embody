
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { SharedHeader } from "@/components/SharedHeader";
import { Footer } from "@/components/Footer";

const ExerciseTracking = () => {
  const [metrics, setMetrics] = useState({
    exerciseTime: "",
    intensity: "",
    heartRate: "",
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

  // Sample historical data for single line graph
  const historicalData = [
    { date: '2024-01-01', exercise: 6 },
    { date: '2024-01-02', exercise: 7 },
    { date: '2024-01-03', exercise: 8 },
    { date: '2024-01-04', exercise: 7 },
    { date: '2024-01-05', exercise: parseInt(metrics.exerciseTime) || 0 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SharedHeader />
      <main className="flex-grow pt-24 bg-[#D3E4FD] dark:bg-gray-900">
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
                <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Exercise Progress</CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Your exercise trends over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          exercise: { color: "#22c55e" },
                        }}
                      >
                        <LineChart data={historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="exercise"
                            stroke="#22c55e"
                            name="Exercise Level"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExerciseTracking;
