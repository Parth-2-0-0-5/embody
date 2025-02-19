
import React, { useEffect, useState } from "react";
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { submitMetricsToML, getHistoricalMetrics } from "@/utils/mlIntegration";
import { toast } from "sonner";

interface BaseMetrics {
  [key: string]: string;
}

export const RecoveryGraphs: React.FC<{ metrics: BaseMetrics }> = ({ metrics }) => {
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    const processMetrics = async () => {
      try {
        // Calculate current metrics
        const currentMetrics = {
          physical_recovery: parseFloat(metrics.painLevel) + parseFloat(metrics.mobilityLevel) + parseFloat(metrics.fatigueLevel),
          mental_health: parseFloat(metrics.stressLevel) + parseFloat(metrics.moodLevel) + parseFloat(metrics.anxietyLevel),
          overall_health: parseFloat(metrics.sleepQuality) + parseFloat(metrics.dietaryHabits),
        };

        // Submit to ML model and get prediction
        await submitMetricsToML(currentMetrics);
        
        // Fetch updated historical data
        const history = await getHistoricalMetrics();
        
        // Transform data for chart
        const chartData = history.map(record => ({
          date: new Date(record.created_at).toLocaleDateString(),
          physical: record.physical_recovery,
          mental: record.mental_health,
          overall: record.overall_health,
        }));

        setHistoricalData(chartData);
      } catch (error) {
        console.error('Error processing metrics:', error);
        toast.error('Failed to process health metrics');
      }
    };

    if (Object.values(metrics).every(value => value !== '')) {
      processMetrics();
    }
  }, [metrics]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Health Progress</CardTitle>
        <CardDescription>AI-Powered Health Analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer
            config={{
              physical: { color: "#22c55e" },
              mental: { color: "#8b5cf6" },
              overall: { color: "#3b82f6" },
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
                dataKey="physical"
                stroke="#22c55e"
                name="Physical Health"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="mental"
                stroke="#8b5cf6"
                name="Mental Health"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="overall"
                stroke="#3b82f6"
                name="Overall Health"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
