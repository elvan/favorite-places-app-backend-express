const DUMMY_PLACES = require('../data/places');
const AppError = require('../errors/app-error');

exports.listPlaces = (req, res) => {
  res.json({
    message: 'Places retrieved successfully',
    placeCount: DUMMY_PLACES.length,
    places: DUMMY_PLACES,
  });
};

exports.getPlace = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    const error = new AppError('Place not found', 404);
    return next(error);
  }

  res.json({
    message: 'Place fetched successfully',
    place: place,
  });
};
