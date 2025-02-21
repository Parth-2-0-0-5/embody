
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { submitMetricsToML, getHistoricalMetrics } from "@/utils/mlIntegration";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface BaseMetrics {
  [key: string]: string;
}

export const RecoveryGraphs: React.FC<{ metrics: BaseMetrics }> = ({ metrics }) => {
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const processMetrics = async () => {
      if (!user?.id) {
        toast.error('Please log in to track your metrics');
        return;
      }

      try {
        // Calculate current metrics
        const currentMetrics = {
          physical_recovery: (
            parseFloat(metrics.painLevel || '0') + 
            parseFloat(metrics.mobilityLevel || '0') + 
            parseFloat(metrics.fatigueLevel || '0')
          ) / 3 * 10, // Scale to 0-100
          mental_health: (
            parseFloat(metrics.stressLevel || '0') + 
            parseFloat(metrics.moodLevel || '0') + 
            parseFloat(metrics.anxietyLevel || '0')
          ) / 3 * 10,
          overall_health: (
            parseFloat(metrics.sleepQuality || '0') + 
            parseFloat(metrics.dietaryHabits || '0')
          ) / 2 * 10,
        };

        // Submit to Supabase and get prediction
        await submitMetricsToML(currentMetrics, user.id);
        
        // Fetch updated historical data
        const history = await getHistoricalMetrics(user.id);
        
        // Transform data for chart
        const chartData = history.map(record => ({
          date: new Date(record.created_at).toLocaleDateString(),
          physical: Math.round(record.physical_recovery),
          mental: Math.round(record.mental_health),
          overall: Math.round(record.overall_health),
        })).reverse(); // Reverse to show oldest to newest

        setHistoricalData(chartData);
        
        // Show success message
        toast.success('Health metrics saved successfully');
      } catch (error) {
        console.error('Error processing metrics:', error);
        toast.error('Failed to save health metrics');
      }
    };

    if (Object.values(metrics).every(value => value !== '')) {
      processMetrics();
    }
  }, [metrics, user]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Health Progress</CardTitle>
        <CardDescription>Health Analysis & Tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
