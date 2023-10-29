const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAllLargeDogs = (req, res) => {
  mongodb
    .getDb()
    .db('DogAdoption')
    .collection('largeDogs')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingleLargeDog = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db('DogAdoption')
    .collection('largeDogs')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const addlargeDog = async (req, res) => {
    const largeDog = {
      name: req.body.name,
      breed: req.body.breed,
      classification: req.body.classification,
      gender: req.body.gender,
      age: req.body.age,
      furColor: req.body.furColor,
      weight: req.body.weight
    };
    const result = await mongodb.getDb().db('DogAdoption').collection('largeDogs').insertOne(largeDog);
    if(result.acknowledged){
      res.status(201).json(result);
    } else {
      res.status(500).json(response.error || 'An error occurred while adding the dog.');
    }
  };

  const updatelargeDog = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to update.');
    }
    const userId = new ObjectId(req.params.id);
    const updatedlargeDog = {
      name: req.body.name,
      breed: req.body.breed,
      classification: req.body.classification,
      gender: req.body.gender,
      age: req.body.age,
      furColor: req.body.furColor,
      weight: req.body.weight
    };
    const result = await mongodb.getDb().db('DogAdoption').collection('largeDogs').replaceOne({ _id: userId }, updatedlargeDog);
    console.log(result)
    if(result.modifiedCount > 0){
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the dog.');
    }
  };

  const deletelargeDog = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to delete.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('DogAdoption')
      .collection('largeDogs')
      .deleteOne({ _id: userId });
    if (result.acknowledged){
      res.status(200).json(result)
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the dog from the database.');
    }
  };

module.exports = { getAllLargeDogs, getSingleLargeDog, addlargeDog, updatelargeDog, deletelargeDog };