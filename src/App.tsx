import { useState } from 'react';
import NavBar from './components/NavBar';
import { startGame } from './fetch/fetchFunctions';
import { useStopwatch } from 'react-timer-hook';
import Stopwatch from './components/Stopwatch';

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
  } = useStopwatch({ autoStart: false });

  const startGameHandler = async () => {
    // if (isRunning) {
    //   return pause();
    // }
    // start();
    const status = await startGame();
    if (status && status === 200) {
      setStartError(false);
      start();
    } else {
      setStartError(true);
    }
  };

  return (
    <>
      <NavBar>
        <Stopwatch hours={hours} minutes={minutes} seconds={seconds} />
        <button id='start-game' onClick={startGameHandler}>
          {!startError
            ? 'Start'
            : isRunning
              ? 'Restart'
              : 'Server Error! Try again'}
        </button>
      </NavBar>
    </>
  );
}

export default App;
