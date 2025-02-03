import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import Index from "./pages/Index";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import WaterTracking from "./pages/WaterTracking";
import ExerciseTracking from "./pages/ExerciseTracking";
import SleepTracking from "./pages/SleepTracking";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
    
    // Add transition class for dark mode
    document.documentElement.classList.add('transition-colors');
    document.documentElement.classList.add('duration-300');
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/recovery" element={<Recovery />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/water-tracking" element={<WaterTracking />} />
                <Route path="/exercise-tracking" element={<ExerciseTracking />} />
                <Route path="/sleep-tracking" element={<SleepTracking />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;