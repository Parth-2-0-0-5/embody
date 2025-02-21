import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { SharedHeader } from "@/components/SharedHeader";
import { Footer } from "@/components/Footer";

export type FieldDefinition = {
  id: string;
  label: string;
  min?: number; // default is 0 if not provided
  max?: number; // default is 10 if not provided
};

interface GenericTrackingPageProps {
  title: string;
  description: string;
  fields: FieldDefinition[];
  calculatorType: string;
  GraphComponent: React.ComponentType<{ metrics: Record<string, string> }>;
}

const GenericTrackingPage: React.FC<GenericTrackingPageProps> = ({
  title,
  description,
  fields,
  calculatorType,
  GraphComponent,
}) => {
  // Initialize state dynamically from the provided fields.
  const initialState = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {} as Record<string, string>);
  const [metrics, setMetrics] = useState<Record<string, string>>(initialState);

  // Updated handleInputChange now accepts min and max values.
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    min: number,
    max: number
  ) => {
    const { name, value } = e.target;
    if (value === "") {
      // Allow clearing the field.
      setMetrics((prev) => ({ ...prev, [name]: value }));
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      setMetrics((prev) => ({ ...prev, [name]: value }));
    } else {
      toast.error(`Please enter a number between ${min} and ${max}`);
    }
  };

  // Check if every field has a value.
  const allFieldsFilled = Object.values(metrics).every((value) => value !== "");

  return (
    <div className="min-h-screen flex flex-col bg-[#D3E4FD] dark:bg-gray-900">
      <SharedHeader />
      <main className="flex-grow pt-20">
        <div className="container mx-auto py-8 px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground dark:text-gray-300 mb-8"
          >
            {description}
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    Enter Your Metrics
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Rate each metric within the allowed range.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {fields.map((field) => {
                    // Use provided min/max or fall back to defaults.
                    const minValue = field.min ?? 0;
                    const maxValue = field.max ?? 10;
                    return (
                      <div key={field.id}>
                        <Label htmlFor={field.id} className="dark:text-white">
                          {field.label}
                        </Label>
                        <Input
                          id={field.id}
                          name={field.id}
                          type="number"
                          min={minValue}
                          max={maxValue}
                          value={metrics[field.id]}
                          onChange={(e) =>
                            handleInputChange(e, minValue, maxValue)
                          }
                          placeholder={`${minValue}-${maxValue}`}
                          className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {allFieldsFilled && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GraphComponent metrics={metrics} />
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GenericTrackingPage;
