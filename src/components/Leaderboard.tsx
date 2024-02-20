import { useEffect, useState } from 'react';
import { getLeaderboard } from '../fetch/fetchFunctions';

function Leaderboard({
  setLeaderboardVisible,
}: {
  setLeaderboardVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [leaderboard, setLeaderboard] = useState<
    undefined | { name: string; time: string }[]
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
      className='animate-fade fixed text-center text-sky-400 sm:px-5 sm:py-7 px-4 py-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 border border-slate-50/5 bg-opacity-80 backdrop-blur-2xl rounded-2xl'
    >
      <p>Leaderboard</p>
      {leaderboard ? (
        leaderboard.map(({ name, time }) => (
          <p>
            {name}: {time}
          </p>
        ))
      ) : fetchError ? (
        <>
          <p>Server Error! Leaderboard data not downloaded.</p>
          <button onClick={fetchLeaderboard}>Retry</button>
        </>
      ) : (
        'loading spinner here'
      )}
      <button onClick={() => setLeaderboardVisible(false)}>Close</button>
    </div>
  );
}

export default Leaderboard;
