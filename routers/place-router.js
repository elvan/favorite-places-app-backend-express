const express = require('express');

const {
  listPlaces,
  getPlace,
  createPlace,
} = require('../controllers/place-controller');

const router = express.Router();

router.get('/', listPlaces);

router.get('/:placeId', getPlace);

router.post('/', createPlace);

module.exports = router;
