import { ReactNode } from 'react';
import StopwatchContext from './contexts';
import { useStopwatch } from 'react-timer-hook';

function StopwatchContextProvider({ children }: { children: ReactNode }) {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  return (
    <StopwatchContext.Provider
      value={{
        seconds,
        minutes,
        hours,
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
