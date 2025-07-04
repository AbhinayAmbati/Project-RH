import React, { useEffect, useState } from 'react';
import { Progress } from './progress';

interface LoadingProps {
  loading: boolean;
}

export function Loading({ loading }: LoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            return prevProgress;
          }
          return prevProgress + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => {
        setProgress(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-[300px]">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
} 