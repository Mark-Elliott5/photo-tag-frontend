import { useContext } from 'react';
import StopwatchContext from './contexts';

// This hook stops "property X does not exist on type Y | null" when object
// destructuring useContext(StopwatchContext) by ensuring StopwatchContext is
// not null. We could also do "useContext(StopwatchContext)!" (non-null
// assertion operator), but we get a useful runtime check and error message
// when components are not wrapped properly using this hook.

export const useStopwatchContext = () => {
  const stopwatchContext = useContext(StopwatchContext);

  if (!stopwatchContext) {
    throw new Error(
      'useStopwatch has to be used within <StopwatchContext.Provider>'
    );
  }

  return stopwatchContext;
};
