const express = require('express');
const { check } = require('express-validator');

const {
  listUsers,
  listUserPlaces,
  registerUser,
  loginUser,
} = require('../controllers/user-controller');
const { validateRequest } = require('../utils/validate-request');

const router = express.Router();

router.post(
  '/register',
  [
    check('name').not().isEmpty().withMessage('Name must not be empty'),
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Email must be a valid email address'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validateRequest,
  registerUser
);

router.post(
  '/login',
  [
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Email must be a valid email address'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validateRequest,
  loginUser
);

router.get('/', listUsers);

router.get('/:userId/places', listUserPlaces);

module.exports = router;
