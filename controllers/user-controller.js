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

    return res.json({
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

    return res.json({
      message: 'User logged in successfully',
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');

    if (!users || users.length === 0) {
      return next(new AppError('No users found', 404));
    }

    return res.json({
      message: 'Users fetched successfully',
      userCount: users.length,
      users,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
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
