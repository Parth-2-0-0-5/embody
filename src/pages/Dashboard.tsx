import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Droplets, Dumbbell, LineChart, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const username = "John";
  const navigate = useNavigate();
  
  const tasks = [
    {
      title: "Recovery Progress",
      description: "Log your daily recovery metrics",
      icon: <LineChart className="w-8 h-8 text-blue-500 icon-float" />,
      link: "/recovery"
    },
    {
      title: "Water Intake",
      description: "Track your hydration levels",
      icon: <Droplets className="w-8 h-8 text-cyan-500 icon-float" />,
      link: "/water-tracking"
    },
    {
      title: "Exercise Time",
      description: "Monitor your workout progress",
      icon: <Dumbbell className="w-8 h-8 text-green-500 icon-float" />,
      link: "/exercise-tracking"
    },
    {
      title: "Sleep Quality",
      description: "Track your sleep patterns",
      icon: <Moon className="w-8 h-8 text-purple-500 icon-float" />,
      link: "/sleep-tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-[#D3E4FD] dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Welcome back, {username}!
        </h1>
        <p className="text-muted-foreground dark:text-gray-300 mb-8 text-lg">
          Here's your recovery dashboard
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tasks.map((task, index) => (
            <Card 
              key={index} 
              className="glass-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800/50 dark:border-gray-700/50"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium dark:text-white">{task.title}</CardTitle>
                <div className="p-2 rounded-full bg-white/80 dark:bg-gray-700/80 shadow-sm">
                  {task.icon}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground dark:text-gray-300 mb-4">{task.description}</p>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 hover:opacity-90 text-white"
                  onClick={() => navigate(task.link)}
                >
                  Go to page
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