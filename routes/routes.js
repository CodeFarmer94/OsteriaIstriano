const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const {
  login,
  register,
  isAuthenticated,
  getProfile,
  getMenu,
  createOrder,
  logout,
  modifyProfile,
  createPayment,
  getLastOrder,
  getAllOrdersFromUser,
  updateOrderStatus
} = require('../controllers/index.js');

const {
  validateUsername,
  validatePassword,
  validateName,
  validateLocation,
  validateSurname,
  validateMobile,
  validateCart,
  validateStatus,
  validateTotal,
  validateUserId,
  validateTime,
  validateNote,
  sanitizeUsername,
  sanitizePassword,
  sanitizeName,
  sanitizeLocation,
  sanitizeSurname,
  sanitizeMobile,
  sanitizeCart,
  sanitizeStatus,
  sanitizeTotal,
  sanitizeUserId,
  sanitizeTime,
  sanitizeNote,
  
} = require('../validators/validators.js');

module.exports = (passport) => {
  router.post('/login',[
    sanitizeUsername(),
    sanitizePassword()
  ],
   passport.authenticate('local'), login);
  router.post('/register', [
    validateUsername(),
    validatePassword(),
    validateName(),
    validateLocation(),
    validateSurname(),
    validateMobile(),
    sanitizeUsername(),
    sanitizePassword(),
    sanitizeName(),
    sanitizeLocation(),
    sanitizeSurname(),
    sanitizeMobile(),
    
  ], register);
  router.get('/profile', isAuthenticated, getProfile);
  router.get('/menu', getMenu);
  router.post('/order', isAuthenticated, createOrder);
  router.get('/order', isAuthenticated, getLastOrder);
  router.put('/order', isAuthenticated, updateOrderStatus)
  router.get('/user-orders', isAuthenticated, getAllOrdersFromUser);
  router.put('/profile', isAuthenticated, [
    validateLocation(),
    validateName(),
    validateSurname(),
    validateMobile(),
    sanitizeLocation(),
    sanitizeName(),
    sanitizeSurname(),
    sanitizeMobile(),
  ], modifyProfile);
  router.post('/logout', logout);
  router.post('/create-payment', [
    validateTotal(),
    sanitizeTotal(),
  ], createPayment);

  return router;
};
