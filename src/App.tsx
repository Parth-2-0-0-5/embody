
import React, { useEffect, useState, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Index from "./pages/Index";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import MentalHealthTracking from "./pages/MentalHealthTracking";
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

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [speed, setSpeed] = useState(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      // Set the cursor position directly from mouse coordinates
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Calculate speed for shape changes
      const currentTime = Date.now();
      const timeDiff = Math.max(1, currentTime - lastTime.current);
      
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const currentSpeed = distance / timeDiff;
      
      setSpeed(currentSpeed);
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
      lastTime.current = currentTime;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('[role="button"]') ||
          target.tagName.toLowerCase() === 'input' ||
          target.tagName.toLowerCase() === 'select' ||
          target.tagName.toLowerCase() === 'textarea') {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const getCursorClass = () => {
    if (isHovering) return 'cursor-hover';
    if (speed > 1) return 'cursor-fast';
    if (speed > 0.5) return 'cursor-medium';
    return '';
  };

  return (
    <div 
      className={`custom-cursor ${getCursorClass()}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

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
        <BrowserRouter>
          <SessionContextProvider supabaseClient={supabase}>
            <AuthProvider>
              <TooltipProvider>
                <CustomCursor />
                <Toaster />
                <Sonner />
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
                  <Route path="/mental-health" element={
                    <ProtectedRoute>
                      <MentalHealthTracking />
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
              </TooltipProvider>
            </AuthProvider>
          </SessionContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
