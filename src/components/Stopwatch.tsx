import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { startGame } from '../fetch/fetchFunctions';

function Stopwatch({
  handleStartGame,
  gameRunning,
}: {
  handleStartGame: (characters: string[]) => void;
  gameRunning: boolean;
}) {
  const {
    // totalSeconds,
    seconds,
    minutes,
    hours,
    // days,
    start,
    pause,
    // reset,
  } = useStopwatch({ autoStart: false });
  const formatUnitOfTime = (unit: number) => {
    return `${unit < 10 ? `0${unit}` : unit}`;
  };
  const timeElapsed = `${formatUnitOfTime(hours)} : ${formatUnitOfTime(minutes)} : ${formatUnitOfTime(seconds)}`;

  const startGameHandler = async () => {
    try {
      const response = await startGame();
      const characters = response.data.characters;
      if (!characters) {
        throw new Error('No characters received.');
      }
      if (characters.length !== 5) {
        throw new Error('Did not receive 5 characters.');
      }
      console.log('Game started');
      handleStartGame(response.data.characters);
      start();
    } catch (err) {
      console.error('startGame error: ' + err);
      // flash error message
    }
    // uncomment to debug
    // handleStartGame(['Aang', 'Ghostface', 'G-Man', 'Ice King', 'Mikasa']);
    // start();
  };

  useEffect(() => {
    if (!gameRunning) {
      pause();
    }
  }, [gameRunning, pause]);

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
        onClick={gameRunning ? undefined : startGameHandler}
      >
        {gameRunning ? 'Game started' : 'Start'}
      </button>
    </>
  );
}

export default Stopwatch;
