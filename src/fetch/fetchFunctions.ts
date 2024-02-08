import axios from 'axios';

async function getAnonCookie() {
  if (!process.env.APIURL) {
    throw new Error('No API URL');
  }
  try {
    // { withCredentials: true } needed only if not accessing the same domain
    const response = await axios.get(process.env.APIURL + '/');
    // response.data == res.body in express
    // status == 400 -> cookie already exists for anon user
    // status == 200 -> cookie did not exist for anon user and has been placed
    return response.status;
  } catch (error) {
    throw new Error(`Axios GET cookie failure: ${error}`);
  }
}

async function submitWaldo(coords: object) {
  if (!process.env.APIURL) {
    throw new Error('No API URL');
  }
  try {
    const response = await axios.post(process.env.APIURL + '/waldo/', coords);
    // status == 400 -> incorrect guess
    // status == 200 -> correct guess
    return response.status;
  } catch (error) {
    throw new Error(`Axios POST guess error: ${error}`);
  }
}

export { getAnonCookie, submitWaldo };

// app.get('/api/', (req, res) => {
//   if (req.cookies.anonId) {
//     res.json();
//   }
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
//     return res.json(true);
//   }
//   res.json(false);
// });

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
