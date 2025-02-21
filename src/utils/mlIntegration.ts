
import { supabase } from "@/integrations/supabase/client";

interface HealthMetrics {
  physical_recovery: number;
  mental_health: number;
  overall_health: number;
  calculator_type: 'physical' | 'mental';
}

interface StoredHealthMetrics extends HealthMetrics {
  id: string;
  created_at: string;
  user_id: string;
  ml_prediction: {
    recommendation: string;
    score: number;
  };
}

export async function submitMetricsToML(metrics: HealthMetrics, userId: string) {
  try {
    const { data, error } = await supabase
      .from('health_metrics')
      .insert([
        {
          physical_recovery: metrics.physical_recovery,
          mental_health: metrics.mental_health,
          overall_health: metrics.overall_health,
          calculator_type: metrics.calculator_type,
          user_id: userId,
          ml_prediction: {
            recommendation: "Keep up with your current routine",
            score: (metrics.physical_recovery + metrics.mental_health + metrics.overall_health) / 3
          }
        },
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in ML integration:', error);
    throw error;
  }
}

export async function getHistoricalMetrics(userId: string, calculatorType: 'physical' | 'mental'): Promise<StoredHealthMetrics[]> {
  try {
    const { data, error } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('calculator_type', calculatorType)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching historical metrics:', error);
    throw error;
  }
}
