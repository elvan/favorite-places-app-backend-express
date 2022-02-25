const { validationResult } = require('express-validator');
const AppError = require('../errors/app-error');

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  const firstError = errors.array({ onlyFirstError: true })[0];
  if (!errors.isEmpty()) {
    return next(new AppError(`${firstError.msg}: ${firstError.param}`, 400));
  }

  next();
};
