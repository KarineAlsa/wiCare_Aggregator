import express from 'express';
import { getAllEvents } from './Controllers/EventController';
import { getByIdEvent } from './Controllers/EventByIdController';
import {VerifyToken} from './Middleware/Verify';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import https from 'https';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

const eventServiceUrl = process.env.EVENT_SERVICE_URL;
const userServiceUrl = process.env.USER_SERVICE_URL;
const donationServiceUrl = process.env.DONATION_SERVICE_URL;
const analyzerServiceUrl = process.env.ANALYZER_SERVICE_URL;

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

if (analyzerServiceUrl) {
  app.use('/analyzer', proxy(analyzerServiceUrl));
} else {
  console.error('ANALYZER_SERVICE_URL is not defined');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/wicare-gateway.ddns.net/privkey.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/wicare-gateway.ddns.net/fullchain.pem')),
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}/`);
});
