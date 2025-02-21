import React from "react";
import GenericTrackingPage, { FieldDefinition } from "@/components/ui/GenericTrackingPage";
import { RecoveryGraphs } from "@/components/ui/RecoveryGraphs";

const recoveryFields: FieldDefinition[] = [
  { id: "painLevel", label: "Pain Level" },
  { id: "mobilityLevel", label: "Mobility Level" },
  { id: "fatigueLevel", label: "Fatigue Level" },
  { id: "dailyActivity", label: "Daily Activity" },
  { id: "sleepQuality", label: "Sleep Quality" },
  { id: "dietaryHabits", label: "Dietary Habits" },
];

const Recovery = () => {
  return (
    <GenericTrackingPage
      title="Recovery Tracking"
      description="Track your daily recovery metrics to monitor your progress."
      fields={recoveryFields}
      calculatorType="recovery"
      GraphComponent={RecoveryGraphs}
    />
  );
};

export default Recovery;
