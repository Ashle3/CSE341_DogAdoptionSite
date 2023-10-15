const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('DogAdoption').collection('smallDogs').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('DogAdoption')
      .collection('smallDogs')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
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
      res.status(500).json(response.error || 'An error occurred while creating the dog.');
    }
  };

  const updatesmallDog = async (req, res) => {
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
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('DogAdoption')
      .collection('smallDogs')
      .deleteOne({ _id: userId });
    if (result.acknowledged){
      res.status(200).json(result)
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the dog.');
    }
  };

module.exports = { getAll, getSingle, addsmallDog, updatesmallDog, deletesmallDog };