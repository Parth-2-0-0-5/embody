
import { supabase } from "@/integrations/supabase/client";

interface HealthMetrics {
  physical_recovery: number;
  mental_health: number;
  overall_health: number;
  calculator_type: 'physical' | 'mental';
}

interface MLPrediction {
  recommendation: string;
  score: number;
}

type DatabaseHealthMetrics = {
  id: string;
  created_at: string;
  user_id: string;
  physical_recovery: number;
  mental_health: number;
  overall_health: number;
  calculator_type: 'physical' | 'mental';
  ml_prediction: MLPrediction;
}

export async function submitMetricsToML(metrics: HealthMetrics, userId: string) {
  try {
    const mlPrediction: MLPrediction = {
      recommendation: "Keep up with your current routine",
      score: (metrics.physical_recovery + metrics.mental_health + metrics.overall_health) / 3
    };

    const { data, error } = await supabase
      .from('health_metrics')
      .insert([{
        ...metrics,
        user_id: userId,
        ml_prediction: mlPrediction
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in ML integration:', error);
    throw error;
  }
}

export async function getHistoricalMetrics(userId: string, calculatorType: 'physical' | 'mental'): Promise<DatabaseHealthMetrics[]> {
  try {
    const { data, error } = await supabase
      .from('health_metrics')
      .select()
      .eq('user_id', userId)
      .eq('calculator_type', calculatorType)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    
    return (data as DatabaseHealthMetrics[]) || [];
  } catch (error) {
    console.error('Error fetching historical metrics:', error);
    throw error;
  }
}
