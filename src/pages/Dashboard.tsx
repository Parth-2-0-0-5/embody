import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Droplets, Dumbbell, LineChart } from "lucide-react";

const Dashboard = () => {
  const username = "John";
  
  const tasks = [
    {
      title: "Track Progress",
      description: "Log your daily recovery metrics",
      icon: <LineChart className="w-8 h-8 text-blue-500 icon-float" />,
      link: "/recovery"
    },
    {
      title: "Drink Water",
      description: "Stay hydrated throughout the day",
      icon: <Droplets className="w-8 h-8 text-cyan-500 icon-float" />,
      action: "Track water intake"
    },
    {
      title: "Exercise",
      description: "Complete your daily exercises",
      icon: <Dumbbell className="w-8 h-8 text-green-500 icon-float" />,
      action: "View exercises"
    },
    {
      title: "Daily Activity",
      description: "Monitor your activity levels",
      icon: <Activity className="w-8 h-8 text-purple-500 icon-float" />,
      action: "Log activity"
    }
  ];

  return (
    <div className="min-h-screen dashboard-bg">
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Welcome back, {username}!
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Here's your recovery dashboard
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tasks.map((task, index) => (
            <Card 
              key={index} 
              className="glass-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
                <div className="p-2 rounded-full bg-white/80 dark:bg-gray-700/80 shadow-sm">
                  {task.icon}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                  onClick={() => task.link ? window.location.href = task.link : null}
                >
                  {task.link ? "Go to page" : task.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;