const { body } = require('express-validator');

exports.validateUsername = () =>
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isEmail()
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters');

exports.validatePassword = () =>
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters');

exports.validateName = () =>
  body('name').notEmpty().withMessage('Name is required');

exports.validateLocation = () =>
  body('location').notEmpty().withMessage('Location is required');

exports.validateSurname = () =>
  body('surname').notEmpty().withMessage('Surname is required');

exports.validateMobile = () =>
  body('mobile').notEmpty().withMessage('Mobile is required');

exports.validateCart = () =>
  body('cart').notEmpty().withMessage('Cart is required');

exports.validateStatus = () =>
  body('status').notEmpty().withMessage('Status is required');

exports.validateTotal = () =>
body('total')
  .notEmpty().withMessage('Total is required')
  .custom(value => {
    if (parseFloat(value) <= 0) {
      throw new Error('Total must be greater than 0');
    }
    return true;
  })


exports.validateUserId = () =>
  body('userId').notEmpty().withMessage('User ID is required');

exports.validateTime = () =>
  body('time').notEmpty().withMessage('Time is required');

exports.validateNote = () =>
  body('note').notEmpty().withMessage('Note is required');

exports.sanitizeUsername = () => body('username').trim().escape();

exports.sanitizePassword = () => body('password').trim();

exports.sanitizeName = () => body('name').trim().escape();

exports.sanitizeLocation = () => body('location').trim().escape();

exports.sanitizeSurname = () => body('surname').trim().escape();

exports.sanitizeMobile = () => body('mobile').trim().escape();

exports.sanitizeCart = () => body('cart').trim().escape();

exports.sanitizeStatus = () => body('status').trim().escape();

exports.sanitizeTotal = () => body('total').trim().escape();

exports.sanitizeUserId = () => body('userId').trim().escape();

exports.sanitizeTime = () => body('time').trim().escape();

exports.sanitizeNote = () => body('note').trim().escape();
