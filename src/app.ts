import express from 'express';
import { getAllEvents } from './Controllers/EventController';
import { getByIdEvent } from './Controllers/EventByIdController';
import {VerifyToken} from './Middleware/Verify';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

const eventServiceUrl = process.env.EVENT_SERVICE_URL;
const userServiceUrl = process.env.USER_SERVICE_URL;
const donationServiceUrl = process.env.DONATION_SERVICE_URL;

if (eventServiceUrl) {
  app.use('/event', proxy(eventServiceUrl));
} else {
  console.error('EVENT_SERVICE_URL is not defined');
}

if (userServiceUrl) {
  app.use('/user', proxy(userServiceUrl));
} else {
  console.error('USER_SERVICE_URL is not defined');
}

if (donationServiceUrl) {
  app.use('/donation', proxy(donationServiceUrl));
} else {
  console.error('DONATION_SERVICE_URL is not defined');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
