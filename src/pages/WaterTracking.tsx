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

const WaterTracking = () => {
  const [metrics, setMetrics] = useState({
    waterIntake: "",
    hydrationLevel: "",
    urineColor: "",
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
    { date: '2024-01-01', hydration: 6 },
    { date: '2024-01-02', hydration: 7 },
    { date: '2024-01-03', hydration: 8 },
    { date: '2024-01-04', hydration: 7 },
    { date: '2024-01-05', hydration: parseInt(metrics.hydrationLevel) || 0 },
  ];

  return (
    <div className="min-h-screen bg-[#D3E4FD] dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          Water Tracking
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground dark:text-gray-300 mb-8"
        >
          Track your daily water intake metrics
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
                  { id: "waterIntake", label: "Water Intake (Glasses)" },
                  { id: "hydrationLevel", label: "Hydration Level" },
                  { id: "urineColor", label: "Urine Color (Clarity)" },
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
                  <CardTitle className="dark:text-white">Hydration Progress</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Your hydration trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        hydration: { color: "#3b82f6" },
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
                          dataKey="hydration"
                          stroke="#3b82f6"
                          name="Hydration Level"
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
    </div>
  );
};

export default WaterTracking;