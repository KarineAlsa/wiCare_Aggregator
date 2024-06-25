import express from 'express';
import { getAllEvents } from './Controllers/EventController';
import { getByIdEvent } from './Controllers/EventByIdController';
import {VerifyToken} from './Middleware/Verify';
import proxy from 'express-http-proxy';
const app = express();
const PORT = 9000;

app.get('/event',VerifyToken,getAllEvents);
app.get('/event/:id',VerifyToken,getByIdEvent);

app.use('/event', proxy('http://18.209.250.86:1234'));
app.use('/user',proxy('http://146.190.64.233:3000'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
