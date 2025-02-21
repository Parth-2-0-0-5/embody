
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
  const [physicalData, setPhysicalData] = useState<any[]>([]);
  const [mentalData, setMentalData] = useState<any[]>([]);
  const [overallData, setOverallData] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const processMetrics = async () => {
      if (!user?.id) {
        toast.error('Please log in to track your metrics');
        return;
      }

      try {
        const currentMetrics = {
          painLevel: parseFloat(metrics.painLevel || '0') * 10,
          mobilityLevel: parseFloat(metrics.mobilityLevel || '0') * 10,
          fatigueLevel: parseFloat(metrics.fatigueLevel || '0') * 10,
          stressLevel: parseFloat(metrics.stressLevel || '0') * 10,
          moodLevel: parseFloat(metrics.moodLevel || '0') * 10,
          anxietyLevel: parseFloat(metrics.anxietyLevel || '0') * 10,
          sleepQuality: parseFloat(metrics.sleepQuality || '0') * 10,
          dietaryHabits: parseFloat(metrics.dietaryHabits || '0') * 10,
        };

        await submitMetricsToML({
          physical_recovery: (currentMetrics.painLevel + currentMetrics.mobilityLevel + currentMetrics.fatigueLevel) / 3,
          mental_health: (currentMetrics.stressLevel + currentMetrics.moodLevel + currentMetrics.anxietyLevel) / 3,
          overall_health: (currentMetrics.sleepQuality + currentMetrics.dietaryHabits) / 2,
          calculator_type: 'physical'
        }, user.id);

        // Format historical data for each graph
        const formatData = (data: any[]) => data.map(record => ({
          date: new Date(record.created_at || '').toLocaleDateString(),
          ...record,
        })).reverse();

        const history = await getHistoricalMetrics(user.id, 'physical');
        const formattedData = formatData(history);

        // Split data into separate arrays for each graph type
        const physical = formattedData.map(d => ({
          date: d.date,
          painLevel: parseFloat(metrics.painLevel || '0') * 10,
          mobilityLevel: parseFloat(metrics.mobilityLevel || '0') * 10,
          fatigueLevel: parseFloat(metrics.fatigueLevel || '0') * 10,
        }));

        const mental = formattedData.map(d => ({
          date: d.date,
          stressLevel: parseFloat(metrics.stressLevel || '0') * 10,
          moodLevel: parseFloat(metrics.moodLevel || '0') * 10,
          anxietyLevel: parseFloat(metrics.anxietyLevel || '0') * 10,
        }));

        const overall = formattedData.map(d => ({
          date: d.date,
          sleepQuality: parseFloat(metrics.sleepQuality || '0') * 10,
          dietaryHabits: parseFloat(metrics.dietaryHabits || '0') * 10,
        }));

        setPhysicalData(physical);
        setMentalData(mental);
        setOverallData(overall);
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

  // Only render graphs that have corresponding metrics filled
  const shouldShowPhysical = metrics.painLevel || metrics.mobilityLevel || metrics.fatigueLevel;
  const shouldShowMental = metrics.stressLevel || metrics.moodLevel || metrics.anxietyLevel;
  const shouldShowOverall = metrics.sleepQuality || metrics.dietaryHabits;

  return (
    <div className="space-y-4">
      {shouldShowPhysical && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Physical Health Metrics</CardTitle>
            <CardDescription>Pain, Mobility, and Fatigue Levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={physicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="painLevel" stroke="#ef4444" name="Pain" strokeWidth={2} />
                  <Line type="monotone" dataKey="mobilityLevel" stroke="#22c55e" name="Mobility" strokeWidth={2} />
                  <Line type="monotone" dataKey="fatigueLevel" stroke="#f59e0b" name="Fatigue" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {shouldShowMental && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Mental Health Metrics</CardTitle>
            <CardDescription>Stress, Mood, and Anxiety Levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mentalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="stressLevel" stroke="#8b5cf6" name="Stress" strokeWidth={2} />
                  <Line type="monotone" dataKey="moodLevel" stroke="#06b6d4" name="Mood" strokeWidth={2} />
                  <Line type="monotone" dataKey="anxietyLevel" stroke="#ec4899" name="Anxiety" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {shouldShowOverall && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Overall Health Metrics</CardTitle>
            <CardDescription>Sleep Quality and Dietary Habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overallData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sleepQuality" stroke="#3b82f6" name="Sleep" strokeWidth={2} />
                  <Line type="monotone" dataKey="dietaryHabits" stroke="#10b981" name="Diet" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
