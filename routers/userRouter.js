const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'User Router',
    users: [
      {
        name: 'User 1',
        email: 'user@example.com',
      },
    ],
  });
});

module.exports = router;
