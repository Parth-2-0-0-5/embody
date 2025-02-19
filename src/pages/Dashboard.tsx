import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Dumbbell, LineChart, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SharedHeader } from "@/components/SharedHeader";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error",
            children: "Failed to fetch user profile",
            variant: "destructive",
          });
          return;
        }
        
        if (data) {
          setUsername(data.username);
        }
      }
    };

    fetchUsername();
  }, [user, toast]);

  const tasks = [
    {
      title: "Recovery Progress",
      description: "Track and monitor your daily recovery progress with detailed metrics and insights",
      icon: <LineChart className="w-8 h-8 text-blue-500 icon-float" />,
      link: "/recovery"
    },
    {
      title: "Mental Health",
      description: "Monitor your mental well-being and emotional state with our comprehensive tracking tools",
      icon: <Brain className="w-8 h-8 text-purple-500 icon-float" />,
      link: "/mental-health"
    },
    {
      title: "Exercise Time",
      description: "Keep track of your workout sessions and physical activity to maintain a healthy lifestyle",
      icon: <Dumbbell className="w-8 h-8 text-green-500 icon-float" />,
      link: "/exercise-tracking"
    },
    {
      title: "Sleep Quality",
      description: "Record and analyze your sleep patterns to improve your rest and recovery routine",
      icon: <Moon className="w-8 h-8 text-indigo-500 icon-float" />,
      link: "/sleep-tracking"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#D3E4FD] dark:bg-gray-900">
      <SharedHeader />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
          >
            Welcome back, {username || "Guest"}!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground dark:text-gray-300 mb-8 text-lg"
          >
            Here's your recovery dashboard
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card 
                  className="glass-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800/50 dark:border-gray-700/50 h-full flex flex-col"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium dark:text-white">{task.title}</CardTitle>
                    <div className="p-2 rounded-full bg-white/80 dark:bg-gray-700/80 shadow-sm">
                      {task.icon}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-sm text-muted-foreground dark:text-gray-300 mb-4 flex-grow">{task.description}</p>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 hover:opacity-90 text-white mt-auto"
                      onClick={() => navigate(task.link)}
                    >
                      Go to page
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
