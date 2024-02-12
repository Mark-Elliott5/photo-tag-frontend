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
  const formatUnitOfTime = (unit: number) => {
    return `${unit < 10 ? `0${unit}` : unit}`;
  };
  const timeElapsed = `${formatUnitOfTime(hours)} : ${formatUnitOfTime(minutes)} : ${formatUnitOfTime(seconds)}`;

  return (
    <>
      <span id='timer'>{timeElapsed}</span>
    </>
  );
}

export default Stopwatch;
