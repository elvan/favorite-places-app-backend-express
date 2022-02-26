const DUMMY_USERS = require('../data/users');
const AppError = require('../errors/app-error');
const Place = require('../models/place');
const User = require('../models/user');

exports.registerUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return next(new AppError('User already exists', 422));
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      imageUrl: req.body.imageUrl,
      places: [],
    };

    const createdUser = await User.create(newUser);

    res.json({
      message: 'User created successfully',
      user: createdUser,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser || existingUser.password !== req.body.password) {
      return next(new AppError('Invalid email or password', 401));
    }

    res.json({
      message: 'User logged in successfully',
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

exports.listUsers = (req, res) => {
  res.json({
    message: 'User Router',
    userCount: DUMMY_USERS.length,
    users: DUMMY_USERS,
  });
};

exports.listUserPlaces = async (req, res, next) => {
  const userId = req.params.userId;
  let userPlaces = [];

  try {
    userPlaces = await Place.find({ creator: userId });
  } catch (error) {
    return next(new AppError(error, 500));
  }

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
