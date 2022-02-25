const express = require('express');

const {
  listPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/place-controller');

const router = express.Router();

router.get('/', listPlaces);

router.get('/:placeId', getPlace);

router.post('/', createPlace);

router.put('/:placeId', updatePlace);

router.delete('/:placeId', deletePlace);

module.exports = router;
