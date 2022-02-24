const DUMMY_PLACES = require('../data/places');
const AppError = require('../errors/app-error');

exports.listUsers = (req, res) => {
  res.json({
    message: 'User Router',
    users: [
      {
        name: 'User 1',
        email: 'user@example.com',
      },
    ],
  });
};

exports.getUser = (req, res, next) => {
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
