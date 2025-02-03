import { Link } from "react-router-dom";
import { DarkModeToggle } from "./DarkModeToggle";
import { FontToggle } from "./FontToggle";
import { motion } from "framer-motion";

export const SharedHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Embody
            </motion.span>
          </Link>
          
          <div className="flex items-center gap-4">
            <FontToggle />
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};