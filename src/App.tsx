import { useState } from 'react';
import NavBar from './components/NavBar';
import { startGame, submitWaldo } from './fetch/fetchFunctions';
import Stopwatch from './components/Stopwatch';
import '../public/style.css';
import { AxiosResponse } from 'axios';
import ContextMenu from './components/ContextMenu';
import Leaderboard from './components/Leaderboard';

function App() {
  const [startError, setStartError] = useState(false);

  const [clickPosition, setClickPosition] = useState({
    x: 0,
    // elementX: 0,
    // elementY: 0,
    y: 0,
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [characters, setCharacters] = useState({
    Aang: false,
    Crewmate: false,
    Gman: false,
    IceKing: false,
    Mikasa: false,
  });
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);

  const startGameHandler = async () => {
    // if (isRunning) {
    //   return pause();
    // }
    // start();
    const status = await startGame();
    console.log(status);
    if (status && status === 200) {
      setStartError(false);
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

  // function handleCloseLeaderboard() {
  //   setLeaderboard(false);
  // }

  // const handleSubmitName = async (
  //   e: React.FormEventHandler<HTMLFormElement>
  // ) => {
  //   const target = e.target as HTMLFormElement;
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const name = formData.get('name');
  //   await handleSubmitName(name);
  // };

  return (
    <>
      <NavBar>
        <Stopwatch
          startGameHandler={startGameHandler}
          startError={startError}
        />
      </NavBar>
      <img src='../public/search.jpeg' onClick={handleMenu} />
      {menuVisible && (
        <ContextMenu
          clickPosition={clickPosition}
          handleCloseMenu={handleCloseMenu}
        />
      )}
      {/* {submitName && (
        <div id='submit-name-wrapper'>
          <p>Submit your name!</p>
          <form onSubmit={handleSubmitName}>
            <input type='text'></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      )} */}
      {leaderboardVisible && (
        <Leaderboard setLeaderboardVisible={setLeaderboardVisible} />
      )}
    </>
  );
}

export default App;
