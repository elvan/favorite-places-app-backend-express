const express = require('express');

const { listUsers, getUser } = require('../controllers/user-controller');

const router = express.Router();

router.get('/', listUsers);

router.get('/:userId/places', getUser);

module.exports = router;
