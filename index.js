const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const AppError = require('./errors/app-error');
const placeRouter = require('./routers/place-router');
const userRouter = require('./routers/user-router');

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_SERVER =
  process.env.MONGODB_SERVER || 'mongodb://localhost:27017/favorite-places-app';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes

app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

app.use('/api/users', userRouter);
app.use('/api/places', placeRouter);

// Not found
app.use((req, res, next) => {
  const error = new AppError('Route not found', 404);
  throw error;
});

// Error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  console.log(error);
  const status = error.status || 500;
  const message = error.message || 'An unknown error occurred!';
  const data = error.data;

  res.status(status).json({
    error: true,
    message: message,
    data: data,
  });
});

mongoose
  .connect(MONGODB_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_SERVER}`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
