import { useEffect, useState } from 'react';
import { getLeaderboard } from '../fetch/fetchFunctions';
import { AxiosResponse } from 'axios';

function Leaderboard({
  setLeaderboardVisible,
}: {
  setLeaderboardVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [leaderboard, setLeaderboard] = useState<
    undefined | { name: string; time: string }[]
  >(undefined);

  useEffect(() => {
    async function fetchLeaderboard() {
      const response:
        | AxiosResponse<{ name: string; time: string }[]>
        | undefined = await getLeaderboard();
      setLeaderboard(response?.data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div id='win-container'>
      <p>You Won!</p>
      {leaderboard
        ? leaderboard.map(({ name, time }) => (
            <p>
              {name}: {time}
            </p>
          ))
        : 'loading spinner here'}
      <button onClick={() => setLeaderboardVisible(false)}>Close</button>
    </div>
  );
}

export default Leaderboard;
