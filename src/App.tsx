import { useState } from 'react';
import NavBar from './components/NavBar';
import { startGame, submitWaldo } from './fetch/fetchFunctions';
import Stopwatch from './components/Stopwatch';
import '../public/style.css';
import { AxiosResponse } from 'axios';
import ContextMenu from './components/ContextMenu';

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
    console.log(`${e.clientX}, ${e.clientY}`);
    setClickPosition({ x: e.clientX, y: e.clientY });
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
