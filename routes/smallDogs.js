const express = require('express');
const router = express.Router();

const smallDogsController = require('../controllers/smallDogs');
const validation = require('../middleware/validate');

router.get('/', smallDogsController.getAll);

router.get('/:id', smallDogsController.getSingle);

router.post('/', validation.saveSmallDog, smallDogsController.addsmallDog);

router.put('/:id', validation.saveSmallDog, smallDogsController.updatesmallDog);

router.delete('/:id', smallDogsController.deletesmallDog);

module.exports = router;