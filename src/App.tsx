import { useState } from 'react';
import NavBar from './components/NavBar';
import Stopwatch from './components/Stopwatch';
import './index.css';
import ContextMenu from './components/ContextMenu';
import Leaderboard from './components/Leaderboard';
import SubmitName from './components/SubmitName';
import WelcomeMessage from './components/WelcomeMessage';
import CharacterPortraits from './components/CharacterPortraits';

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

  const [guessCoords, setGuessCoords] = useState({ x: 0, y: 0 });

  const [characters, setCharacters] = useState<{ [k: string]: boolean }>({
    Aang: true,
    Ghostface: true,
    'G-Man': true,
    'Ice King': true,
    Mikasa: true,
  });

  const handleStartGame = (characters: string[]) => {
    const newCharacters = Object.fromEntries(
      characters.map((character) => [character, true])
    );
    setCharacters(newCharacters);
    setDisplayWelcome(false);
    setGameRunning(true);
  };

  const handleCloseMenu = (data: {
    correct: boolean;
    win: boolean;
    value: string;
    error?: string;
  }) => {
    if (data.correct) {
      setCharacters({
        ...characters,
        [data.value]: false,
      });
      // flash correct message
      // useEffect(() => setTimeout then clearTimeout)
    } else {
      // flash incorrect message
    }
    if (data.win) {
      setSubmitNameVisible(true);
    }
    setMenuVisible(false);
  };

  const handleMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    setClickPosition({ x: e.clientX, y: e.clientY });
    const absoluteCoords = findAbsoluteCoords(e);
    setGuessCoords(absoluteCoords);
    setMenuVisible(true);
  };

  const findAbsoluteCoords = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = (e.target as HTMLImageElement).getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;

    const x = Math.round((offsetX / rect.width) * 100);
    const y = Math.round((offsetY / rect.height) * 100);

    // console.log(`Offset Coords: [${x}, ${y}]`);
    return { x, y };
  };

  return (
    <>
      <NavBar>
        <Stopwatch
          handleStartGame={handleStartGame}
          gameRunning={gameRunning}
        />
      </NavBar>
      {displayWelcome ? <WelcomeMessage /> : undefined}
      <img
        id='search-image'
        src='./search.jpeg'
        className={gameRunning ? undefined : 'blur-sm -z-10'}
        onClick={gameRunning ? handleMenu : undefined}
        onMouseMove={findAbsoluteCoords}
      />
      {gameRunning && <CharacterPortraits characters={characters} />}
      {menuVisible && (
        <ContextMenu
          guessCoords={guessCoords}
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
