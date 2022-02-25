const express = require('express');
const { check } = require('express-validator');

const {
  listUsers,
  listUserPlaces,
  registerUser,
  loginUser,
} = require('../controllers/user-controller');
const { validateRequest } = require('../controllers/utils/validate-request');

const router = express.Router();

router.post(
  '/register',
  [
    check('name').isLength({ min: 2 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  validateRequest,
  registerUser
);

router.post(
  '/login',
  [check('email').isEmail(), check('password').isLength({ min: 6 })],
  validateRequest,
  loginUser
);

router.get('/', listUsers);

router.get('/:userId/places', listUserPlaces);

module.exports = router;
