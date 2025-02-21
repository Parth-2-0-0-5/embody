import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

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

// This interface matches exactly what's in the database
interface DatabaseHealthMetrics {
  id: string;
  created_at: string;
  user_id: string;
  physical_recovery: number;
  mental_health: number;
  overall_health: number;
  calculator_type: 'physical' | 'mental';
  ml_prediction: Json;
}

export async function submitMetricsToML(metrics: HealthMetrics, userId: string) {
  try {
    // Compute ML prediction (for example, by averaging the metrics)
    const avg =
      (metrics.physical_recovery +
        metrics.mental_health +
        metrics.exercise +
        metrics.sleep_quality) /
      4;

    const mlPrediction: MLPrediction = {
      recommendation: "Keep up with your current routine",
      score: avg, // ensure your ML model returns a score between 1 and 100
    };

    // Build the data object, ensuring numeric fields are numbers
    const dataToInsert = {
      physical_recovery: metrics.physical_recovery,
      mental_health: metrics.mental_health,
      exercise: metrics.exercise,
      sleep_quality: metrics.sleep_quality,
      calculator_type: metrics.calculator_type,
      user_id: userId,
      ml_prediction: mlPrediction as Json,
    };

    // Insert the data into Supabase (wrapped in an array)
    const { data, error } = await supabase
      .from("health_metrics")
      .insert([dataToInsert])
      .select();

    if (error) {
      console.error("Error inserting into Supabase:", error);
      throw error;
    }

    console.log("Successfully saved health metrics:", data);
    return data;
  } catch (error) {
    console.error("Error in submitMetricsToML:", error);
    throw error;
  }
}
export async function getHistoricalMetrics(
  userId: string,
  calculatorType: 'physical' | 'mental'
): Promise<DatabaseHealthMetrics[]> {
  try {
    const { data, error } = await supabase
      .from<DatabaseHealthMetrics>('health_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('calculator_type', calculatorType)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    // Transform the data to ensure all required fields are present
    const transformedData: DatabaseHealthMetrics[] = (data || []).map((record: DatabaseHealthMetrics) => ({
      id: record.id,
      created_at: record.created_at,
      user_id: record.user_id,
      physical_recovery: record.physical_recovery || 0,
      mental_health: record.mental_health || 0,
      overall_health: record.overall_health || 0,
      calculator_type: record.calculator_type || calculatorType,
      ml_prediction: record.ml_prediction as Json,
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching historical metrics:', error);
    throw error;
  }
}
