const bodyParser = require('body-parser');
const express = require('express');

const AppError = require('./errors/app-error');
const placeRouter = require('./routers/place-router');
const userRouter = require('./routers/user-router');

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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
