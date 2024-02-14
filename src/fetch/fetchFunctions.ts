import axios from 'axios';

async function getAnonCookie() {
  // if (!process.env.APIURL) {
  //   throw new Error('No API URL');
  // }
  try {
    // { withCredentials: true } needed only if not accessing the same domain
    const response = await axios.get(window.location.hostname + '/api/');
    // response.data == res.body in express
    // status == 401 -> cookie already exists for anon user
    // status == 200 -> cookie did not exist for anon user and has been placed
    return response.status;
  } catch (error) {
    throw new Error(`Axios GET anon cookie failure: ${error}`);
  }
}

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

async function getUserCookie(credentials: {
  username: string;
  password: string;
}) {
  // if (!process.env.APIURL) {
  //   throw new Error('No API URL');
  // }
  try {
    const response = await axios.post(
      window.location.hostname + '/api/login',
      credentials
    );
    return response.data;
  } catch (error) {
    throw new Error(`Axios POST login failure: ${error}`);
  }
}

async function startGame() {
  // if (!process.env.APIURL) {
  //   throw new Error('No API URL');
  // }
  try {
    // { withCredentials: true } needed only if not accessing the same domain
    const response = await axios.get(window.location.hostname + '/api/start');
    // response.data == res.body in express
    // status == 401 -> error
    // status == 200 -> req.session.startTime set
    return response;
    // whatever takes in return response.status needs to call stopwatch start
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

async function submitWaldo(coords: { x: number; y: number }, object: string) {
  // if (!process.env.APIURL) {
  //   throw new Error('No API URL');
  // }
  try {
    const response = await axios.post(window.location.hostname + '/api/waldo', {
      coords,
      object,
    });
    // status == 401 -> incorrect guess
    // status == 200 -> correct guess
    // response needs to have info denoting win condition to display message/leaderboard
    return response;
  } catch (error) {
    console.log(`Axios POST guess error: ${error}`);
  }
}

export {
  getAnonCookie,
  getLeaderboard,
  getUserCookie,
  startGame,
  submitName,
  submitWaldo,
};

// app.get('/api/', (req, res) => {
//   if (req.cookies.anonId) {
//     res.json();
//   }
//     const id = nanoId();
//     res.cookie('anonId', id, { httpOnly: true });
//   }
// );

// app.get('/api/start', (req, res) => {
//    req.session.startTime = new Date();
//     const id = nanoId();
//     res.cookie('anonId', id, { httpOnly: true });
//   }
// );

// app.post('/api/login', passport.authenticate(['local', 'anonymous']));

// need to use localstrategy and anonymousStrategy

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

// front end date string calculation:
// let delta =
// Math.abs(endTime.valueOf() - req.session.startTime.valueOf()) / 1000;
// const days = Math.floor(delta / 86400);
// delta -= days * 86400;
// const hours = Math.floor(delta / 3600) % 24;
// delta -= hours * 3600;
// const minutes = Math.floor(delta / 60) % 60;
// delta -= minutes * 60;

// // what's left is seconds
// const seconds = delta % 60;

// react app needs to use event.offsetX and offsetY to determine actual coords to be submitted?
// function getCoords15(event) {
//   const rect2 = canvas.getBoundingClientRect();
//   const x = Math.floor(event.clientX - rect.left);
//   const y = Math.floor(event.clientY - rect.top);
//    return {x,y};
//   // Send coords via axios
// }

// interface Dict<T> {
//   [key: string]: T | undefined;
// }

// startDate: startDateVar, // some react state variable
// endDate: endDateVar,

// export { useAllProducts, useAllCategories, useInCategory };
