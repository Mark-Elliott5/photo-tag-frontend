import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

function Stopwatch({
  startGameHandler,
  gameRunning,
}: {
  startGameHandler: () => void;
  gameRunning: boolean;
}) {
  // const { isRunning, hours, minutes, seconds } = useStopwatchContext();
  const {
    // totalSeconds,
    seconds,
    minutes,
    hours,
    // days,
    start,
    // pause,
    // reset,
  } = useStopwatch({ autoStart: false });
  const formatUnitOfTime = (unit: number) => {
    return `${unit < 10 ? `0${unit}` : unit}`;
  };
  const timeElapsed = `${formatUnitOfTime(hours)} : ${formatUnitOfTime(minutes)} : ${formatUnitOfTime(seconds)}`;
  const startWatch = () => {
    startGameHandler();
  };

  useEffect(() => {
    if (gameRunning === true) {
      start();
    }
  }, [gameRunning, start]);

  return (
    <>
      <span
        id='timer'
        className='text-center whitespace-nowrap md:text-base sm:text-sm text-xs  bg-slate-400/10 px-3 py-1 rounded-full font-medium tabular-nums'
      >
        {timeElapsed}
      </span>
      <button
        className={`py-1 px-4 whitespace-nowrap md:text-base sm:text-sm text-xs rounded-full ${gameRunning ? 'bg-slate-900/60 text-gray-500 ' : 'bg-sky-400/10 text-sky-400'}`}
        id='start-game'
        onClick={startWatch}
      >
        {gameRunning ? 'Game started' : 'Start'}
      </button>
    </>
  );
}

export default Stopwatch;
