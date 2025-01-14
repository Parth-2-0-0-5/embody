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
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

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

  const recoveryData = [
    {
      name: "Recovery",
      value: calculateRecoveryPercentage(),
      fill: "#22c55e",
    }
  ];

  const healthData = [
    {
      name: "Health",
      value: calculateHealthPercentage(),
      fill: "#3b82f6",
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Recovery and Health Metrics</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="h-[200px]">
          <ChartContainer
            config={{
              recovery: { color: "#22c55e" },
              health: { color: "#3b82f6" },
            }}
          >
            <RadialBarChart
              innerRadius="30%"
              outerRadius="100%"
              data={recoveryData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={30}
                background={{ fill: "#f3f4f6" }}
              />
              <Legend />
              <Tooltip
                cursor={false}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-white p-2 rounded shadow">
                        <p className="text-sm">{`${payload[0].value}%`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RadialBarChart>
          </ChartContainer>
        </div>

        <div className="h-[200px]">
          <ChartContainer
            config={{
              recovery: { color: "#22c55e" },
              health: { color: "#3b82f6" },
            }}
          >
            <RadialBarChart
              innerRadius="30%"
              outerRadius="100%"
              data={healthData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={30}
                background={{ fill: "#f3f4f6" }}
              />
              <Legend />
              <Tooltip
                cursor={false}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-white p-2 rounded shadow">
                        <p className="text-sm">{`${payload[0].value}%`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};