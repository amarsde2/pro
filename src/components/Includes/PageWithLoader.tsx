'use client';

import { useEffect, useState, ReactNode } from 'react';
import Loader from './Loader';

interface PageWithLoaderProps {
  children: ReactNode;
  duration?: number; // Optional: allows dynamic control of loading time
}

const PageWithLoader: React.FC<PageWithLoaderProps> = ({ children, duration = 2000 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (loading) return <Loader />;
  return <>{children}</>;
};

export default PageWithLoader;
