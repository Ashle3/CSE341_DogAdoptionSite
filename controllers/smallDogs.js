const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db('DogAdoption')
    .collection('smallDogs')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db('DogAdoption')
    .collection('smallDogs')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const addsmallDog = async (req, res) => {
    const smallDog = {
      name: req.body.name,
      breed: req.body.breed,
      classification: req.body.classification,
      gender: req.body.gender,
      age: req.body.age,
      furColor: req.body.furColor,
      weight: req.body.weight
    };
    const result = await mongodb.getDb().db('DogAdoption').collection('smallDogs').insertOne(smallDog);
    if(result.acknowledged){
      res.status(201).json(result);
    } else {
      res.status(500).json(response.error || 'An error occurred while adding the dog.');
    }
  };

  const updatesmallDog = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to update.');
    }
    const userId = new ObjectId(req.params.id);
    const updatedsmallDog = {
      name: req.body.name,
      breed: req.body.breed,
      classification: req.body.classification,
      gender: req.body.gender,
      age: req.body.age,
      furColor: req.body.furColor,
      weight: req.body.weight
    };
    const result = await mongodb.getDb().db('DogAdoption').collection('smallDogs').replaceOne({ _id: userId }, updatedsmallDog);
    console.log(result)
    if(result.modifiedCount > 0){
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the dog.');
    }
  };

  const deletesmallDog = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to delete.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('DogAdoption')
      .collection('smallDogs')
      .deleteOne({ _id: userId });
    if (result.acknowledged){
      res.status(200).json(result)
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the dog from the database.');
    }
  };

module.exports = { getAll, getSingle, addsmallDog, updatesmallDog, deletesmallDog };