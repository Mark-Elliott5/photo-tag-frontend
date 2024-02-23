import axios, { AxiosResponse } from 'axios';

async function getLeaderboard() {
  try {
    const response: AxiosResponse<{ name: string; time: number }[]> =
      await axios.get('/api/leaderboard');
    // return a leaderboard json
    return response;
  } catch (error) {
    console.error(`Axios GET leaderboad error: ${error}`);
    return Promise.reject(error);
  }
}

async function startGame() {
  try {
    // { withCredentials: true } needed only if not accessing the same domain
    const response: AxiosResponse<{ characters: string[] }> =
      await axios.get('/api/start');
    return response;
  } catch (error) {
    console.error(`Axios GET startGame() failure: ${error}`);
    return Promise.reject(error);
  }
}

async function submitName(name: string) {
  try {
    const response: AxiosResponse<{ accepted: boolean }> = await axios.post(
      '/api/name',
      { name }
    );
    return response;
  } catch (error) {
    console.error(`Axios POST name error: ${error}`);
    return Promise.reject(error);
  }
}

async function guessWaldo(coords: { x: number; y: number }, waldo: string) {
  try {
    const response: AxiosResponse<{ correct: boolean; win: boolean }> =
      await axios.post('/api/guess', {
        coords,
        waldo,
      });
    return response;
  } catch (error) {
    console.error(`Axios POST guess error: ${error}`);
    return Promise.reject(error);
  }
}

export { getLeaderboard, startGame, submitName, guessWaldo };
