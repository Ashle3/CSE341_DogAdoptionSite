const validator = require('../helpers/validate');

const saveSmallDog = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    breed: 'required|string',
    classification: 'required|string',
    gender: 'required|string',
    age: 'required|string',
    furColor: 'required|string',
    weight: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveLargeDog = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    breed: 'required|string',
    classification: 'required|string',
    gender: 'required|string',
    age: 'required|string',
    furColor: 'required|string',
    weight: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveSmallDog,
  saveLargeDog
};