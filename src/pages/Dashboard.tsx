import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Droplets, Dumbbell, LineChart } from "lucide-react";

const Dashboard = () => {
  const username = "John"; // This would normally come from auth/state management
  
  const tasks = [
    {
      title: "Track Progress",
      description: "Log your daily recovery metrics",
      icon: <LineChart className="w-6 h-6" />,
      link: "/recovery"
    },
    {
      title: "Drink Water",
      description: "Stay hydrated throughout the day",
      icon: <Droplets className="w-6 h-6" />,
      action: "Track water intake"
    },
    {
      title: "Exercise",
      description: "Complete your daily exercises",
      icon: <Dumbbell className="w-6 h-6" />,
      action: "View exercises"
    },
    {
      title: "Daily Activity",
      description: "Monitor your activity levels",
      icon: <Activity className="w-6 h-6" />,
      action: "Log activity"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-2">Welcome back, {username}!</h1>
      <p className="text-muted-foreground mb-8">Here's your recovery dashboard</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.map((task, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
              {task.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
              <Button 
                className="w-full"
                onClick={() => task.link ? window.location.href = task.link : null}
              >
                {task.link ? "Go to page" : task.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;