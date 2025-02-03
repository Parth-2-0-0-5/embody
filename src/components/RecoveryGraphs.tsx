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

interface BaseMetrics {
  [key: string]: string;
}

export const RecoveryGraphs: React.FC<{ metrics: BaseMetrics }> = ({ metrics }) => {
  const calculateRecoveryPercentage = () => {
    // Calculate average of first three metrics
    const values = Object.values(metrics);
    const firstThreeAverage = values.slice(0, 3).reduce((acc, curr) => acc + parseInt(curr), 0) / 3;
    return Math.round(firstThreeAverage * 10);
  };

  const calculateHealthPercentage = () => {
    // Calculate average of last three metrics
    const values = Object.values(metrics);
    const lastThreeAverage = values.slice(3, 6).reduce((acc, curr) => acc + parseInt(curr), 0) / 3;
    return Math.round(lastThreeAverage * 10);
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
  const currentMetrics = Object.entries(metrics).map(([name, value]) => ({
    name: name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value: parseInt(value)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Metrics Overview</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-12">
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