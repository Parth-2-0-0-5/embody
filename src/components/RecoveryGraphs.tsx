import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

interface Metrics {
  painLevel: string;
  mobilityLevel: string;
  fatigueLevel: string;
  dailyActivity: string;
  sleepQuality: string;
  dietaryHabits: string;
}

interface RecoveryGraphsProps {
  metrics: Metrics;
}

export const RecoveryGraphs: React.FC<RecoveryGraphsProps> = ({ metrics }) => {
  const calculateRecoveryPercentage = () => {
    const painScore = 100 - (parseInt(metrics.painLevel) * 10);
    const mobilityScore = parseInt(metrics.mobilityLevel) * 10;
    const fatigueScore = 100 - (parseInt(metrics.fatigueLevel) * 10);
    
    return Math.round((painScore + mobilityScore + fatigueScore) / 3);
  };

  const calculateHealthPercentage = () => {
    const activityScore = parseInt(metrics.dailyActivity) * 10;
    const sleepScore = parseInt(metrics.sleepQuality) * 10;
    const dietScore = parseInt(metrics.dietaryHabits) * 10;
    
    return Math.round((activityScore + sleepScore + dietScore) / 3);
  };

  // Sample historical data
  const historicalData = [
    { date: '2024-01-01', recovery: 65, health: 70 },
    { date: '2024-01-02', recovery: 68, health: 72 },
    { date: '2024-01-03', recovery: 72, health: 75 },
    { date: '2024-01-04', recovery: 70, health: 78 },
    { date: '2024-01-05', recovery: calculateRecoveryPercentage(), health: calculateHealthPercentage() },
  ];

  // Current metrics for bar chart
  const currentMetrics = [
    { name: 'Pain', value: parseInt(metrics.painLevel) },
    { name: 'Mobility', value: parseInt(metrics.mobilityLevel) },
    { name: 'Fatigue', value: parseInt(metrics.fatigueLevel) },
    { name: 'Activity', value: parseInt(metrics.dailyActivity) },
    { name: 'Sleep', value: parseInt(metrics.sleepQuality) },
    { name: 'Diet', value: parseInt(metrics.dietaryHabits) },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Recovery and Health Metrics</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="h-[300px]">
          <CardTitle className="mb-4">Historical Trends</CardTitle>
          <ChartContainer
            config={{
              recovery: { color: "#22c55e" },
              health: { color: "#3b82f6" },
            }}
          >
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="recovery"
                stroke="#22c55e"
                name="Recovery"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="health"
                stroke="#3b82f6"
                name="Health"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="h-[300px]">
          <CardTitle className="mb-4">Current Metrics</CardTitle>
          <ChartContainer
            config={{
              metrics: { color: "#3b82f6" },
            }}
          >
            <BarChart data={currentMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Score" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};