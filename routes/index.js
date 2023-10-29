const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/smallDogs', require('./smallDogs'));

router.use('/largeDogs', require('./largeDogs'));

module.exports = router;