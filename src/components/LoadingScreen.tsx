import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-32 bg-muted animate-pulse rounded-md"></div>
          <div className="flex gap-4">
            <div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>
            <div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-card rounded-lg shadow-sm">
              <div className="h-4 w-24 bg-muted animate-pulse rounded mb-4"></div>
              <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            </div>
          ))}
        </div>

        {/* Graph Skeleton */}
        <div className="w-full h-[300px] bg-card rounded-lg shadow-sm p-6">
          <div className="h-4 w-32 bg-muted animate-pulse rounded mb-8"></div>
          <div className="relative h-[200px]">
            <div className="absolute bottom-0 w-full h-[1px] bg-muted"></div>
            <div className="absolute left-0 h-full w-[1px] bg-muted"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute h-24 w-12 bg-muted animate-pulse rounded"
                style={{
                  left: `${(i - 1) * 25}%`,
                  bottom: '20px',
                  opacity: 0.7
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};