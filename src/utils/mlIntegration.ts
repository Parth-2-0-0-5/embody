
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface HealthMetrics {
  physical_recovery: number;
  mental_health: number;
  overall_health: number;
}

export async function submitMetricsToML(metrics: HealthMetrics, userId: string) {
  try {
    // Store metrics in Supabase with user_id
    const { data, error } = await supabase
      .from('health_metrics')
      .insert([
        {
          physical_recovery: metrics.physical_recovery,
          mental_health: metrics.mental_health,
          overall_health: metrics.overall_health,
          user_id: userId,
          // For now, we'll skip the ML prediction and just store the metrics
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

export async function getHistoricalMetrics(userId: string) {
  try {
    const { data, error } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching historical metrics:', error);
    throw error;
  }
}
