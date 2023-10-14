const express = require('express');
const router = express.Router();

//swagger route to go here later

router.use('/smallDogs', require('./smallDogs'));

module.exports = router;