import axios from 'axios';

async function getLeaderboard() {
  try {
    const response = await axios.get(
      window.location.hostname + '/api/leaderboard'
    );
    // return a leaderboard json
    return response;
  } catch (error) {
    console.log(`Axios GET leaderboad error: ${error}`);
  }
}

async function startGame() {
  try {
    // { withCredentials: true } needed only if not accessing the same domain
    const response = await axios.get(window.location.hostname + '/api/start');
    return response;
  } catch (error) {
    throw new Error(`Axios GET anon cookie failure: ${error}`);
  }
}

async function submitName(name: string) {
  try {
    const response = await axios.post(
      window.location.hostname + '/api/name',
      name
    );
    // return a leaderboard json
    return response;
  } catch (error) {
    console.log(`Axios POST name error: ${error}`);
  }
}

async function guessWaldo(coords: { x: number; y: number }, waldo: string) {
  try {
    const response = await axios.post(window.location.hostname + '/api/waldo', {
      coords,
      waldo,
    });
    return response;
  } catch (error) {
    console.log(`Axios POST guess error: ${error}`);
  }
}

export { getLeaderboard, startGame, submitName, guessWaldo };

// async function getAnonCookie() {
//   // if (!process.env.APIURL) {
//   //   throw new Error('No API URL');
//   // }
//   try {
//     // { withCredentials: true } needed only if not accessing the same domain
//     const response = await axios.get(window.location.hostname + '/api/');
//     // response.data == res.body in express
//     // status == 401 -> cookie already exists for anon user
//     // status == 200 -> cookie did not exist for anon user and has been placed
//     return response.status;
//   } catch (error) {
//     throw new Error(`Axios GET anon cookie failure: ${error}`);
//   }
// }

// async function getUserCookie(credentials: {
//   username: string;
//   password: string;
// }) {
//   // if (!process.env.APIURL) {
//   //   throw new Error('No API URL');
//   // }
//   try {
//     const response = await axios.post(
//       window.location.hostname + '/api/login',
//       credentials
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(`Axios POST login failure: ${error}`);
//   }
// }

// app.post('/api/submit', (req, res) => {
//   if (!req.isAuthenticated()) {
//     res.status(401).json('Cookie not found!');
//   }
//   if (!req.session.startTime) {
//     res.status(401).json('Game has not been started.');
//   }
//   // check req.body.coords and compare to database
//   // interface Object {
//   //   object: string;
//   //   minX: number;
//   //   maxX: number;
//   //   minY: number;
//   //   maxY: number;
//   // }
//   const waldo = Waldo.findOne({ object: req.body.object });
//   const { minX, maxX, minY, maxY } = waldo;
//   const { x, y } = req.body;

//   if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
//     req.session.correct += 1;
//     if (req.session.correct === 3) {
//       const endTime = new Date();
//       const milliseconds = Math.abs(
//         endTime.valueOf() - req.session.startTime.valueOf()
//       );
//       req.session.startTime = undefined;
//       res.json(milliseconds);
//       // get total seconds between the times
//     }
//     return res.json(true);
//   }
//   res.json(false);
// });
