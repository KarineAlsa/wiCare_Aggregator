import express from 'express';
import { getAllEvents } from './Controllers/EventController';
import { getByIdEvent } from './Controllers/EventByIdController';
import {VerifyToken} from './Middleware/Verify';
import proxy from 'express-http-proxy';
const app = express();
const PORT = 9000;

app.use('/event', proxy('http://104.248.49.221:1234'));
app.use('/user',proxy('http://146.190.64.233:3000'))
app.use('/donation',proxy('http://142.93.14.203:4321'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
