import { useStopwatchContext } from '../context/useStopwatchContext';

function Stopwatch() {
  const { isRunning, hours, minutes, seconds } = useStopwatchContext();

  return (
    <>
      <span id='timer'>
        {isRunning ? `${hours}: ${minutes}: ${seconds}` : undefined}
      </span>
    </>
  );
}

export default Stopwatch;
