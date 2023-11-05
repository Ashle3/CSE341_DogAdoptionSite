const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();
const { requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};
  
const express = require('express');
const router = express.Router();

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));
// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.use('/', require('./swagger'));

router.use('/smallDogs', require('./smallDogs'));

router.use('/largeDogs', require('./largeDogs'));

router.get('/smallDogs', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;