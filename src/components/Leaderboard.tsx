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
    <div id='leaderboard'>
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
