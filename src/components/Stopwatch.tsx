// import { useStopwatchContext } from '../context/useStopwatchContext';

function Stopwatch({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) {
  // const { isRunning, hours, minutes, seconds } = useStopwatchContext();

  return (
    <>
      <span id='timer'>{`${hours}: ${minutes}: ${seconds}`}</span>
    </>
  );
}

export default Stopwatch;
