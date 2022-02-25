const uuid = require('uuid').v4;

const { validationResult } = require('express-validator');
const DUMMY_PLACES = require('../data/places');
const DUMMY_USERS = require('../data/users');
const AppError = require('../errors/app-error');

exports.registerUser = (req, res, next) => {
  const user = req.body;
  user.id = uuid();

  if (DUMMY_USERS.find((u) => u.email === user.email)) {
    return next(new AppError('User already exists', 400));
  }

  DUMMY_USERS.push(user);

  res.status(201).json({
    message: 'User created successfully',
    user: user,
  });
};

exports.loginUser = (req, res, next) => {
  const user = DUMMY_USERS.find((u) => u.email === req.body.email);

  if (!user) {
    const error = new AppError('User not found', 404);
    return next(error);
  }

  res.json({
    message: 'User logged in successfully',
    user: user,
  });
};

exports.listUsers = (req, res) => {
  res.json({
    message: 'User Router',
    userCount: DUMMY_USERS.length,
    users: DUMMY_USERS,
  });
};

exports.listUserPlaces = (req, res, next) => {
  const userId = req.params.userId;
  const userPlaces = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!userPlaces || userPlaces.length === 0) {
    const error = new AppError('User has no places', 404);
    return next(error);
  }

  res.json({
    message: 'User places fetched successfully',
    placeCount: userPlaces.length,
    places: userPlaces,
  });
};
