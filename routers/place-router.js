const express = require('express');

const {
  listPlaces,
  getPlace,
  createPlace,
  updatePlace,
} = require('../controllers/place-controller');

const router = express.Router();

router.get('/', listPlaces);

router.get('/:placeId', getPlace);

router.post('/', createPlace);

router.put('/:placeId', updatePlace);

module.exports = router;
