import { createContext } from 'react';

interface StopwatchContextType {
  totalSeconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
}

const StopwatchContext = createContext<StopwatchContextType | null>(null);

export default StopwatchContext;
