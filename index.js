const express = require('express');
const bodyParser = require('body-parser');

const placeRouter = require('./routers/placeRouter');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

app.use('/places', placeRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
