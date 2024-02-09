import { ReactNode } from 'react';
import StopwatchContext from './contexts';
import { useStopwatch } from 'react-timer-hook';

function StopwatchContextProvider({ children }: { children: ReactNode }) {
  // in the future, possibly remove values like totalSeconds, days, and
  // pause if they are not used (likely won't be). Remove them from useStopwatch
  // destructuring, values in .Provider, and StopWatch context interface.
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  return (
    <StopwatchContext.Provider
      value={{
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      }}
    >
      {children}
    </StopwatchContext.Provider>
  );
}

export default StopwatchContextProvider;
