const express = require('express');

const router = express.Router();

const { login, register, isAuthenticated , getProfile, getMenu, createOrder, logout, modifyProfile, createPayment, getLastOrder, getAllOrdersFromUser
 } = require('../controllers')

module.exports = (passport) => {
   
    router.post("/login", passport.authenticate("local", { failureRedirect: "/" }), login);
    router.post('/register', register)
    router.get('/profile', isAuthenticated, getProfile)
    router.get('/menu', getMenu)
    router.post('/order', isAuthenticated, createOrder)
    router.get('/order', isAuthenticated, getLastOrder)
    router.get('/user-orders', isAuthenticated, getAllOrdersFromUser)
    router.put('/profile', isAuthenticated, modifyProfile)
    router.post("/logout", logout);
    router.post('/create-payment', createPayment)
    return router;
  };