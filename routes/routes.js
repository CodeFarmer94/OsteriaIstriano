const express = require('express');

const router = express.Router();

const { login, register, isAuthenticated , getProfile, getMenu, createOrder, logout } = require('../controllers')

module.exports = (passport) => {
   
    router.post("/login", passport.authenticate("local", { failureRedirect: "/failure" }), login);
    router.post('/register', register)
    router.get('/profile', isAuthenticated, getProfile)
    router.get('/menu', getMenu)
    router.post('/order', isAuthenticated, createOrder)
    router.get("/logout", logout);
    return router;
  };