const bodyParser = require('body-parser');
const express = require('express');

const placeRouter = require('./routers/placeRouter');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

app.use('/api/users', userRouter);
app.use('/api/places', placeRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
