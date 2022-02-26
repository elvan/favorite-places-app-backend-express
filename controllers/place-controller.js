const AppError = require('../errors/app-error');
const Place = require('../models/place');

exports.getPlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      const error = new AppError('Place not found', 404);
      return next(error);
    }

    res.status(200).json({
      message: 'Place retrieved successfully',
      place: place,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
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
  } catch (error) {
    return next(new AppError(error, 500));
  }

  res.status(201).json({
    message: 'Place created successfully',
    place: place,
  });
};

exports.updatePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      const error = new AppError('Place not found', 404);
      return next(error);
    }

    place.title = req.body.title ?? place.title;
    place.description = req.body.description ?? place.description;
    place.imageUrl = req.body.imageUrl ?? place.imageUrl;
    place.address = req.body.address ?? place.address;
    place.location = req.body.location ?? place.location;

    await place.save();

    res.status(200).json({
      message: 'Place updated successfully',
      place: place,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

exports.deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      const error = new AppError('Place not found', 404);
      return next(error);
    }

    await place.remove();

    res.status(200).json({
      message: 'Place deleted successfully',
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};
