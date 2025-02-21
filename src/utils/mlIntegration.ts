
import { supabase } from "@/integrations/supabase/client";

// Define simple, flat types without complex nesting
type HealthMetrics = {
  physical_recovery: number;
  mental_health: number;
  overall_health: number;
  calculator_type: 'physical' | 'mental';
};

type MLPrediction = {
  recommendation: string;
  score: number;
};

// Flatten the database type completely
type HealthMetricsRecord = {
  id: string;
  created_at: string | null;
  user_id: string | null;
  physical_recovery: number | null;
  mental_health: number | null;
  overall_health: number | null;
  ml_prediction: MLPrediction | null;
  calculator_type: 'physical' | 'mental';
};

export async function submitMetricsToML(metrics: HealthMetrics, userId: string) {
  try {
    const mlPrediction: MLPrediction = {
      recommendation: "Keep up with your current routine",
      score: (metrics.physical_recovery + metrics.mental_health + metrics.overall_health) / 3
    };

    const { data, error } = await supabase
      .from('health_metrics')
      .insert({
        physical_recovery: metrics.physical_recovery,
        mental_health: metrics.mental_health,
        overall_health: metrics.overall_health,
        calculator_type: metrics.calculator_type,
        user_id: userId,
        ml_prediction: mlPrediction
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in ML integration:', error);
    throw error;
  }
}

export async function getHistoricalMetrics(
  userId: string, 
  calculatorType: 'physical' | 'mental'
): Promise<HealthMetricsRecord[]> {
  try {
    const { data, error } = await supabase
      .from('health_metrics')
      .select()
      .eq('user_id', userId)
      .eq('calculator_type', calculatorType)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    // Transform the data with basic type assertions
    return (data || []).map(record => ({
      id: record.id || '',
      created_at: record.created_at,
      user_id: record.user_id,
      physical_recovery: record.physical_recovery,
      mental_health: record.mental_health,
      overall_health: record.overall_health,
      ml_prediction: record.ml_prediction as MLPrediction,
      calculator_type: calculatorType
    }));
  } catch (error) {
    console.error('Error fetching historical metrics:', error);
    throw error;
  }
}
