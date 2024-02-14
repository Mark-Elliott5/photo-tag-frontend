import { useStopwatch } from 'react-timer-hook';

function Stopwatch({
  startGameHandler,
  startError,
}: {
  startGameHandler: () => void;
  startError: boolean;
}) {
  // const { isRunning, hours, minutes, seconds } = useStopwatchContext();
  const {
    // totalSeconds,
    seconds,
    minutes,
    hours,
    // days,
    isRunning,
    start,
    // pause,
    // reset,
  } = useStopwatch({ autoStart: true });
  const formatUnitOfTime = (unit: number) => {
    return `${unit < 10 ? `0${unit}` : unit}`;
  };
  const timeElapsed = `${formatUnitOfTime(hours)} : ${formatUnitOfTime(minutes)} : ${formatUnitOfTime(seconds)}`;
  const startWatch = () => {
    start();
    startGameHandler();
  };

  return (
    <>
      <span
        id='timer'
        className='text-center bg-slate-400/10 px-3 py-1 rounded-full font-medium tabular-nums'
      >
        {timeElapsed}
      </span>
      <button
        className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
        id='start-game'
        onClick={startWatch}
      >
        {!startError
          ? 'Start'
          : isRunning
            ? 'Restart'
            : 'Server Error! Try again'}
      </button>
    </>
  );
}

export default Stopwatch;
