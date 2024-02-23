import { createContext } from 'react';

interface StopwatchContextType {
  seconds: number;
  minutes: number;
  hours: number;
  start: () => void;
  pause: () => void;
  reset: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
}

const StopwatchContext = createContext<StopwatchContextType | null>(null);

export default StopwatchContext;
