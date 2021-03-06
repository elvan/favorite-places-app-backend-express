const express = require('express');
const { check } = require('express-validator');

const {
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/place-controller');
const { validateRequest } = require('../utils/validate-request');

const router = express.Router();

router.get('/:placeId', getPlace);

router.post(
  '/',
  [
    check('title').trim().isLength({ min: 5, max: 100 }),
    check('description').trim().isLength({ min: 5, max: 500 }),
    check('address').trim().isLength({ min: 5, max: 500 }),
  ],
  validateRequest,
  createPlace
);

router.put(
  '/:placeId',
  [
    check('title').trim().isLength({ min: 5, max: 100 }),
    check('description').trim().isLength({ min: 5, max: 500 }),
    check('address').trim().isLength({ min: 5, max: 500 }),
  ],
  validateRequest,
  updatePlace
);

router.delete('/:placeId', deletePlace);

module.exports = router;
