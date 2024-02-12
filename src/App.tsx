import { useState } from 'react';
import NavBar from './components/NavBar';
import { startGame, submitWaldo } from './fetch/fetchFunctions';
import { useStopwatch } from 'react-timer-hook';
import Stopwatch from './components/Stopwatch';
import '../public/style.css';
import { AxiosResponse } from 'axios';

function App() {
  const [startError, setStartError] = useState(false);
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
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const [characters, setCharacters] = useState({
    AmongUs: false,
    Mikasa: false,
    Gman: false,
    Aang: false,
    IceKing: false,
  });
  const [leaderboard, setLeaderboard] = useState<
    false | { name: string; time: string }[]
  >(false);

  const startGameHandler = async () => {
    // if (isRunning) {
    //   return pause();
    // }
    // start();
    const status = await startGame();
    console.log(status);
    if (status && status === 200) {
      setStartError(false);
      start();
    } else {
      setStartError(true);
    }
  };

  const checkCoords = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const response:
      | AxiosResponse<{ leaderboard?: { name: string; time: string }[] }>
      | undefined = await submitWaldo(
      { x, y },
      (e.target as HTMLButtonElement).value
    );
    console.log(response);
    if (!response) {
      return console.error('Api not responding to guesses');
    }
    if (response.status === 200) {
      setCharacters({
        ...characters,
        [(e.target as HTMLButtonElement).value]: true,
      });
    }
    if (response.data.leaderboard) {
      setLeaderboard(response.data.leaderboard);
    }
  };

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.clientX > window.innerWidth / 1.2
      ? setMenuPosition({ x: e.clientX - 130, y: e.clientY })
      : setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleCloseMenu = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await checkCoords(e);
    setMenuVisible(false);
  };

  // function handleCloseLeaderboard() {
  //   setLeaderboard(false);
  // }

  return (
    <>
      <NavBar>
        <Stopwatch hours={hours} minutes={minutes} seconds={seconds} />
        <button
          className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
          id='start-game'
          onClick={startGameHandler}
        >
          {!startError
            ? 'Start'
            : isRunning
              ? 'Restart'
              : 'Server Error! Try again'}
        </button>
      </NavBar>
      <img src='../public/search.jpeg' onClick={handleMenu} />
      {menuVisible && (
        <div
          id='context-menu'
          style={{
            position: 'absolute',
            top: menuPosition.y,
            left: menuPosition.x,
          }}
          className='flex flex-col items-center px-4 py-3 bg-slate-800 border-b border-slate-50/5 gap-2 rounded-2xl'
        >
          <button
            onClick={handleCloseMenu}
            value='AmongUs'
            className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
          >
            Among Us
          </button>
          <button
            onClick={handleCloseMenu}
            value='GMan'
            className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
          >
            G-Man
          </button>
          <button
            onClick={handleCloseMenu}
            value='Aang'
            className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
          >
            Aang
          </button>
          <button
            onClick={handleCloseMenu}
            value='Mikasa'
            className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
          >
            Mikasa
          </button>
          <button
            onClick={handleCloseMenu}
            value='IceKing'
            className='bg-sky-400/10 text-sky-400 py-1 px-4 rounded-full'
          >
            Ice King
          </button>
        </div>
      )}
      {/* {leaderboard !== false && (
        <div id='win-container'>
          <p>You Won!</p>
          <button onClick={handleCloseLeaderboard}>Close</button>
          {leaderboard.map(({ name, time }) => (
            <div>
              {name}: {time}
            </div>
          ))}
        </div>
      )} */}
    </>
  );
}

export default App;
