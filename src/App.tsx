import { useEffect, useState } from 'react';
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
  const [welcomeVisible, setWelcomeVisible] = useState(true);

  const [guessColor, setGuessColor] = useState<'red' | 'green' | undefined>(
    undefined
  );
  const [guessCoords, setGuessCoords] = useState({ x: 0, y: 0 });
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

  const handleStartGame = (characters: string[]) => {
    const newCharacters = Object.fromEntries(
      characters.map((character) => [character, true])
    );
    setCharacters(newCharacters);
    setWelcomeVisible(false);
    setLeaderboardVisible(false);
    setGameRunning(true);
  };

  const handleCloseMenu = (correct: boolean, win: boolean, value: string) => {
    if (correct) {
      setCharacters({
        ...characters,
        [value]: false,
      });
      setGuessColor('green');
    } else {
      setGuessColor('red');
    }
    if (win) {
      setSubmitNameVisible(true);
      setGameRunning(false);
    }
    setMenuVisible(false);
  };

  const handleCloseSubmitName = () => {
    setSubmitNameVisible(false);
    setLeaderboardVisible(true);
  };

  const handleMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    setClickPosition({ x: e.clientX, y: e.clientY });
    const absoluteCoords = findAbsoluteCoords(e);
    setGuessCoords(absoluteCoords);
    setMenuVisible(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGuessColor(undefined);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [guessColor]);

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
      <NavBar guessColor={guessColor}>
        <Stopwatch
          handleStartGame={handleStartGame}
          gameRunning={gameRunning}
          submitNameVisible={submitNameVisible}
        />
      </NavBar>
      {welcomeVisible && <WelcomeMessage />}
      <img
        id='search-image'
        src='./search.jpeg'
        className={`object-fill min-w-[100dvw] min-h-[100dvh] ${gameRunning ? undefined : 'blur-sm -z-10'}`}
        onClick={gameRunning ? handleMenu : undefined}
        // onMouseMove={findAbsoluteCoords}
      />
      {gameRunning && (
        <CharacterPortraits guessColor={guessColor} characters={characters} />
      )}
      {menuVisible && (
        <ContextMenu
          guessCoords={guessCoords}
          clickPosition={clickPosition}
          handleCloseMenu={handleCloseMenu}
          characters={characters}
        />
      )}
      {submitNameVisible && (
        <SubmitName handleCloseSubmitName={handleCloseSubmitName} />
      )}
      {leaderboardVisible && <Leaderboard />}
    </>
  );
}

export default App;
