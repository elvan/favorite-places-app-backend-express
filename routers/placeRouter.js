const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Place Router',
    places: [
      {
        name: 'Place 1',
        description: 'Description 1',
        image:
          'https://images.unsplash.com/photo-1624965085151-0710f6b3f284?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MnwxfDB8MXxyYW5kb218MHx8cGxhY2VzfHx8fHx8MTY0NTc0MTA1Mw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=450',
        location: {
          lat: -34.397,
          lng: 150.644,
        },
      },
    ],
  });
});

module.exports = router;
