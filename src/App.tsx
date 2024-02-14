import { useState } from 'react';
import NavBar from './components/NavBar';
import { startGame, submitWaldo } from './fetch/fetchFunctions';
import Stopwatch from './components/Stopwatch';
import '../public/style.css';
import { AxiosResponse } from 'axios';
import ContextMenu from './components/ContextMenu';
import Leaderboard from './components/Leaderboard';
import SubmitName from './components/SubmitName';

function App() {
  const [gameRunning, setGameRunning] = useState(false);
  const [submitNameVisible, setSubmitNameVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);

  const [clickPosition, setClickPosition] = useState({
    x: 0,
    y: 0,
  });

  const [characters, setCharacters] = useState({
    Aang: false,
    Crewmate: false,
    Gman: false,
    IceKing: false,
    Mikasa: false,
  });

  const startGameHandler = async () => {
    try {
      const status = await startGame();
      if (status && status === 200) {
        console.log('Game started');
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
        [(e.target as HTMLButtonElement).value]: true,
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

  return (
    <>
      <NavBar>
        <Stopwatch
          startGameHandler={startGameHandler}
          gameRunning={gameRunning}
        />
      </NavBar>
      <img src='../public/search.jpeg' onClick={handleMenu} />
      {menuVisible && (
        <ContextMenu
          clickPosition={clickPosition}
          handleCloseMenu={handleCloseMenu}
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
