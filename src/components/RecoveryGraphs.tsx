
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
          ) / 3 * 10,
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

        await submitMetricsToML(currentMetrics, user.id);
        const history = await getHistoricalMetrics(user.id);
        
        const chartData = history.map(record => ({
          date: new Date(record.created_at || '').toLocaleDateString(),
          ...record,
        })).reverse();

        setHistoricalData(chartData);
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

  const graphs = [
    {
      title: "Physical Health Metrics",
      description: "Pain, Mobility, and Fatigue Levels",
      metrics: [
        { key: "painLevel", color: "#ef4444", name: "Pain" },
        { key: "mobilityLevel", color: "#22c55e", name: "Mobility" },
        { key: "fatigueLevel", color: "#f59e0b", name: "Fatigue" }
      ]
    },
    {
      title: "Mental Health Metrics",
      description: "Stress, Mood, and Anxiety Levels",
      metrics: [
        { key: "stressLevel", color: "#8b5cf6", name: "Stress" },
        { key: "moodLevel", color: "#06b6d4", name: "Mood" },
        { key: "anxietyLevel", color: "#ec4899", name: "Anxiety" }
      ]
    },
    {
      title: "Overall Health Metrics",
      description: "Sleep Quality and Dietary Habits",
      metrics: [
        { key: "sleepQuality", color: "#3b82f6", name: "Sleep" },
        { key: "dietaryHabits", color: "#10b981", name: "Diet" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {graphs.map((graph, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle>{graph.title}</CardTitle>
            <CardDescription>{graph.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  {graph.metrics.map((metric) => (
                    <Line
                      key={metric.key}
                      type="monotone"
                      dataKey={metric.key}
                      stroke={metric.color}
                      name={metric.name}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
