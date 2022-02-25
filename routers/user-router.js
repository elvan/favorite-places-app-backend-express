const express = require('express');

const { listUsers, getUserPlaces } = require('../controllers/user-controller');

const router = express.Router();

router.get('/', listUsers);

router.get('/:userId/places', getUserPlaces);

module.exports = router;
