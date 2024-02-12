// import { useState } from 'react';
// import { useStopwatchContext } from '../context/useStopwatchContext';
// import { startGame } from '../fetch/fetchFunctions';

// function StartButton({
//   setRunning,
// }: {
//   setRunning: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const { start } = useStopwatchContext();
//   const [error, setError] = useState(false);

//   const startGameHandler = async () => w{
//     const status = await startGame();
//     if (status && status === 200) {
//       setError(false);
//       setRunning(true);
//       start();
//     } else {
//       setError(true);
//     }
//   };

//   return (
//     <>
//       <button id='start-game' onClick={startGameHandler}>
//         {!error ? 'Start' : 'Server Error! Try again'}
//       </button>
//     </>
//   );
// }

// export default StartButton;
