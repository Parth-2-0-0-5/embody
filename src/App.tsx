
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Index from "./pages/Index";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import WaterTracking from "./pages/WaterTracking";
import ExerciseTracking from "./pages/ExerciseTracking";
import SleepTracking from "./pages/SleepTracking";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
    
    document.documentElement.classList.add('transition-colors');
    document.documentElement.classList.add('duration-300');
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/recovery" element={
                    <ProtectedRoute>
                      <Recovery />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/water-tracking" element={
                    <ProtectedRoute>
                      <WaterTracking />
                    </ProtectedRoute>
                  } />
                  <Route path="/exercise-tracking" element={
                    <ProtectedRoute>
                      <ExerciseTracking />
                    </ProtectedRoute>
                  } />
                  <Route path="/sleep-tracking" element={
                    <ProtectedRoute>
                      <SleepTracking />
                    </ProtectedRoute>
                  } />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </SessionContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
