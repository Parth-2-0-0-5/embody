
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
    // Create the ML prediction as a plain object that matches Json type
    const mlPrediction = {
      recommendation: "Keep up with your current routine",
      score: (metrics.physical_recovery + metrics.mental_health + metrics.overall_health) / 3
    } as Json;

    // Create the data object that matches the database schema
    const dataToInsert = {
      physical_recovery: metrics.physical_recovery,
      mental_health: metrics.mental_health,
      overall_health: metrics.overall_health,
      calculator_type: metrics.calculator_type,
      user_id: userId,
      ml_prediction: mlPrediction
    };

    const { data, error } = await supabase
      .from('health_metrics')
      .insert(dataToInsert)
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
      .select('*')
      .eq('user_id', userId)
      .eq('calculator_type', calculatorType)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    
    // Transform the data to ensure all required fields are present
    const transformedData = (data || []).map(record => ({
      id: record.id,
      created_at: record.created_at,
      user_id: record.user_id,
      physical_recovery: record.physical_recovery || 0,
      mental_health: record.mental_health || 0,
      overall_health: record.overall_health || 0,
      calculator_type: record.calculator_type || calculatorType,
      ml_prediction: record.ml_prediction as Json
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching historical metrics:', error);
    throw error;
  }
}
