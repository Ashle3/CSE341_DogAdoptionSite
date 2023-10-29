const express = require('express');
const router = express.Router();

const largeDogsController = require('../controllers/largeDogs');
const validation = require('../middleware/validate');

router.get('/', largeDogsController.getAllLargeDogs);

router.get('/:id', largeDogsController.getSingleLargeDog);

router.post('/', validation.saveLargeDog, largeDogsController.addlargeDog);

router.put('/:id', validation.saveLargeDog, largeDogsController.updatelargeDog);

router.delete('/:id', largeDogsController.deletelargeDog);

module.exports = router;