const express = require('express');

const { listPlaces, getPlace } = require('../controllers/place-controller');

const router = express.Router();

router.get('/', listPlaces);

router.get('/:placeId', getPlace);

module.exports = router;
