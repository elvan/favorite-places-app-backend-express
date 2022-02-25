const express = require('express');

const {
  listUsers,
  listUserPlaces,
  registerUser,
  loginUser,
} = require('../controllers/user-controller');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/', listUsers);

router.get('/:userId/places', listUserPlaces);

module.exports = router;
