import { useState } from 'react';
import NavBar from './components/NavBar';
import { startGame, submitWaldo } from './fetch/fetchFunctions';
import Stopwatch from './components/Stopwatch';
import '../public/style.css';
import { AxiosResponse } from 'axios';
import ContextMenu from './components/ContextMenu';
import Leaderboard from './components/Leaderboard';
import SubmitName from './components/SubmitName';
import WelcomeMessage from './components/WelcomeMessage';

function App() {
  const [gameRunning, setGameRunning] = useState(false);
  const [submitNameVisible, setSubmitNameVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const [displayWelcome, setDisplayWelcome] = useState(true);

  const [clickPosition, setClickPosition] = useState({
    x: 0,
    y: 0,
  });

  const [characters, setCharacters] = useState<{ [k: string]: boolean }>({
    Aang: true,
    Ghostface: true,
    'G-Man': true,
    'Ice King': true,
    Mikasa: true,
  });

  const startGameHandler = async () => {
    try {
      const response: AxiosResponse<string[]> = await startGame();
      if (response && response.status === 200) {
        console.log('Game started');
        // remove if block or add else throw new Error before prod
        if (typeof response.data !== 'string') {
          const newCharacters = Object.fromEntries(
            response.data.map((character) => [character, true])
          );
          setCharacters(newCharacters);
        }
        setDisplayWelcome(false);
        setGameRunning(true);
      } else {
        throw new Error('start game failed');
      }
    } catch (err) {
      console.log(err);
      setGameRunning(false);
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
        [(e.target as HTMLButtonElement).value]: false,
      });
    }
    if (response.data.leaderboard) {
      setLeaderboardVisible(true);
    }
  };

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setClickPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleCloseMenu = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await checkCoords(e);
    setMenuVisible(false);
  };

  const findCoords = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect2 = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect2.left;
    const y = e.clientY - rect2.top;
    console.log(`Offset Coords: [${x}, ${y}]`);
  };

  return (
    <>
      <NavBar>
        <Stopwatch
          startGameHandler={startGameHandler}
          gameRunning={gameRunning}
        />
      </NavBar>
      {displayWelcome ? <WelcomeMessage /> : undefined}
      <img
        src='../public/search.jpeg'
        className={gameRunning ? undefined : 'blur-sm -z-10'}
        onClick={gameRunning ? handleMenu : undefined}
        onMouseMove={findCoords}
      />
      {gameRunning && (
        <div className='fixed flex flex-row text-center text-sky-400 gap-2 px-3 py-3 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl rounded-2xl'>
          {Object.keys(characters).map((key) => (
            <img
              key={key}
              className='sm:w-8 sm:h-8 w-6 h-6 aspect-square'
              src={`../public/${key}.jpg`}
            />
          ))}{' '}
        </div>
      )}
      {menuVisible && (
        <ContextMenu
          clickPosition={clickPosition}
          handleCloseMenu={handleCloseMenu}
          characters={characters}
        />
      )}
      {submitNameVisible && (
        <SubmitName setSubmitNameVisible={setSubmitNameVisible} />
      )}
      {leaderboardVisible && (
        <Leaderboard setLeaderboardVisible={setLeaderboardVisible} />
      )}
    </>
  );
}

export default App;
