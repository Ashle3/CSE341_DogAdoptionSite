const express = require('express');
const router = express.Router();

const smallDogsController = require('../controllers/smallDogs');

router.get('/', smallDogsController.getAll);

router.get('/:id', smallDogsController.getSingle);

router.post('/', smallDogsController.addsmallDog);

module.exports = router;