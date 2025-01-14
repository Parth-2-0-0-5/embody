import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecoveryGraphs } from "@/components/RecoveryGraphs";

const Recovery = () => {
  const [metrics, setMetrics] = useState({
    painLevel: "",
    mobilityLevel: "",
    fatigueLevel: "",
    dailyActivity: "",
    sleepQuality: "",
    dietaryHabits: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    
    if ((numValue >= 0 && numValue <= 10) || value === "") {
      setMetrics(prev => ({ ...prev, [name]: value }));
    } else {
      toast.error("Please enter a number between 0 and 10");
    }
  };

  const allFieldsFilled = Object.values(metrics).every(value => value !== "");

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Recovery Tracking</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Metrics</CardTitle>
            <CardDescription>
              Rate each metric from 0 (lowest) to 10 (highest)
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="painLevel">Pain Level</Label>
              <Input
                id="painLevel"
                name="painLevel"
                type="number"
                min="0"
                max="10"
                value={metrics.painLevel}
                onChange={handleInputChange}
                placeholder="0-10"
              />
            </div>
            <div>
              <Label htmlFor="mobilityLevel">Mobility Level</Label>
              <Input
                id="mobilityLevel"
                name="mobilityLevel"
                type="number"
                min="0"
                max="10"
                value={metrics.mobilityLevel}
                onChange={handleInputChange}
                placeholder="0-10"
              />
            </div>
            <div>
              <Label htmlFor="fatigueLevel">Fatigue Level</Label>
              <Input
                id="fatigueLevel"
                name="fatigueLevel"
                type="number"
                min="0"
                max="10"
                value={metrics.fatigueLevel}
                onChange={handleInputChange}
                placeholder="0-10"
              />
            </div>
            <div>
              <Label htmlFor="dailyActivity">Daily Activity</Label>
              <Input
                id="dailyActivity"
                name="dailyActivity"
                type="number"
                min="0"
                max="10"
                value={metrics.dailyActivity}
                onChange={handleInputChange}
                placeholder="0-10"
              />
            </div>
            <div>
              <Label htmlFor="sleepQuality">Sleep Quality</Label>
              <Input
                id="sleepQuality"
                name="sleepQuality"
                type="number"
                min="0"
                max="10"
                value={metrics.sleepQuality}
                onChange={handleInputChange}
                placeholder="0-10"
              />
            </div>
            <div>
              <Label htmlFor="dietaryHabits">Dietary Habits</Label>
              <Input
                id="dietaryHabits"
                name="dietaryHabits"
                type="number"
                min="0"
                max="10"
                value={metrics.dietaryHabits}
                onChange={handleInputChange}
                placeholder="0-10"
              />
            </div>
          </CardContent>
        </Card>

        {allFieldsFilled && (
          <RecoveryGraphs metrics={metrics} />
        )}
      </div>
    </div>
  );
};

export default Recovery;