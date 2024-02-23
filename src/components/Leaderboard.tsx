import { useEffect, useState } from 'react';
import { getLeaderboard } from '../fetch/fetchFunctions';
import prettyMilliseconds from 'pretty-ms';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<
    undefined | { name: string; time: number }[]
  >(undefined);
  const [fetchError, setFetchError] = useState(false);

  const fetchLeaderboard = async () => {
    setFetchError(false);
    try {
      const response = await getLeaderboard();
      setLeaderboard(response.data);
    } catch (err) {
      console.error('getLeaderboard error: ' + err);
      setFetchError(true);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div
      id='leaderboard'
      className='flex flex-col z-10 w-3/4 h-3/4 animate-fade fixed text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl rounded-2xl'
    >
      <p className='w-full sm:text-2xl text-2xl font-extrabold mb-2 sm:py-7 py-6'>
        Leaderboard
      </p>
      <div className='overflow-scroll'>
        {leaderboard ? (
          leaderboard.map(({ name, time }, i) => (
            <div className='grid grid-cols-3 mx-30%'>
              <p>{i + 1}.</p>
              <p>{name}</p>
              <p>{prettyMilliseconds(time, { colonNotation: true })}</p>
            </div>
          ))
        ) : fetchError ? (
          <>
            <p>Server Error! Leaderboard data not downloaded.</p>
            <button onClick={fetchLeaderboard}>Retry</button>
          </>
        ) : (
          'Loading...'
        )}
      </div>
      <p className='z-10 w-full sm:py-7 py-6 '>
        Click <span className='font-extrabold text-lg'>Start</span> to play
        again!
      </p>
    </div>
  );
}

export default Leaderboard;
