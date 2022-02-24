const bodyParser = require('body-parser');
const express = require('express');

const placeRouter = require('./routers/placeRouter');
const userRouter = require('./routers/userRouter');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes

app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

app.use('/api/users', userRouter);
app.use('/api/places', placeRouter);

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
