
import { supabase } from "@/integrations/supabase/client";

interface HealthMetrics {
  physical_recovery: number;
  mental_health: number;
  overall_health: number;
}

export async function submitMetricsToML(metrics: HealthMetrics) {
  try {
    // Send metrics to FastAPI server
    const response = await fetch('http://your-fastapi-server/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metrics),
    });

    if (!response.ok) {
      throw new Error('Failed to get prediction from ML model');
    }

    const prediction = await response.json();

    // Store metrics and prediction in Supabase
    const { data, error } = await supabase
      .from('health_metrics')
      .insert([
        {
          physical_recovery: metrics.physical_recovery,
          mental_health: metrics.mental_health,
          overall_health: metrics.overall_health,
          ml_prediction: prediction,
        },
      ]);

    if (error) throw error;
    return prediction;
  } catch (error) {
    console.error('Error in ML integration:', error);
    throw error;
  }
}

export async function getHistoricalMetrics() {
  try {
    const { data, error } = await supabase
      .from('health_metrics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching historical metrics:', error);
    throw error;
  }
}
