const uuid = require('uuid').v4;

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

exports.createPlace = (req, res, next) => {
  const place = req.body;
  place.id = uuid();

  DUMMY_PLACES.push(place);

  res.status(201).json({
    message: 'Place created successfully',
    place: place,
  });
};

exports.updatePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  if (!place) {
    const error = new AppError('Place not found', 404);
    return next(error);
  }

  place.title = req.body.title ?? place.title;
  place.description = req.body.description ?? place.description;
  place.imageUrl = req.body.imageUrl ?? place.imageUrl;
  place.address = req.body.address ?? place.address;
  place.location = req.body.location ?? place.location;

  if (placeIndex !== -1) {
    DUMMY_PLACES[placeIndex] = place;
  }

  res.status(200).json({
    message: 'Place updated successfully',
    place: place,
  });
};
