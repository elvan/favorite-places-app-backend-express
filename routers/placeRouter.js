const express = require('express');

const router = express.Router();

const places = [
  {
    id: 'p1',
    title: 'One57',
    description:
      'One57, formerly known as Carnegie 57, is a 75-story, 1,005 ft (306 m) supertall skyscraper in the Midtown neighborhood of Manhattan in New York City',
    image:
      'https://en.wikipedia.org/wiki/File:One57_from_Columbus_Circle,_May_2014.png',
    address: '157 West 57th Street Manhattan, New York, US',
    location: {
      lat: 40.765556,
      lng: -73.979167,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description:
      'The Empire State Building is a 102-story skyscraper located in Midtown Manhattan in New York City',
    image:
      'https://en.wikipedia.org/wiki/File:Empire_State_Building_from_the_Top_of_the_Rooftop.jpg',
    address: '350 5th Avenue, New York, US',
    location: {
      lat: 40.7484405,
      lng: -73.9856646,
    },
    creator: 'u2',
  },
];

router.get('/p', (req, res) => {
  res.json({
    message: 'Places retrieved successfully',
    places: places,
  });
});

router.get('/p/:placeId', (req, res) => {
  res.json({
    message: 'Place fetched successfully',
    place: places.find((place) => place.id === req.params.placeId),
  });
});

router.get('/u/:userId', (req, res) => {
  res.json({
    message: 'Places fetched successfully',
    places: places.filter((place) => place.creator === req.params.userId),
  });
});

module.exports = router;
