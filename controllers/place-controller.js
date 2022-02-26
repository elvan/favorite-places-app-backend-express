const DUMMY_PLACES = require('../data/places');
const AppError = require('../errors/app-error');
const Place = require('../models/place');

exports.listPlaces = (req, res) => {
  res.json({
    message: 'Places retrieved successfully',
    placeCount: DUMMY_PLACES.length,
    places: DUMMY_PLACES,
  });
};

exports.getPlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err);
    const error = new AppError('Fetching place failed', 500);
    return next(error);
  }

  if (!place) {
    const error = new AppError('Place not found', 404);
    return next(error);
  }

  res.status(200).json({
    message: 'Place retrieved successfully',
    place: place,
  });
};

exports.createPlace = async (req, res, next) => {
  const place = new Place({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    address: req.body.address,
    location: req.body.location,
    creator: req.body.creator,
  });

  try {
    await place.save();
  } catch (err) {
    console.log(err);
    const error = new AppError('Creating place failed', 500);
    return next(error);
  }

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

exports.deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  if (placeIndex === -1) {
    const error = new AppError('Place not found', 404);
    return next(error);
  }

  DUMMY_PLACES.splice(placeIndex, 1);

  res.status(200).json({
    message: 'Place deleted successfully',
  });
};
