const Contract = require("../models/contractModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createContract = asyncHandler(async (req, res) => {
  try {
    const newContract = await Contract.create(req.body);
    res.json(newContract);
  } catch (error) {
    throw new Error(error);
  }
});

const updateContract = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedContract = await Contract.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedContract);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteContract = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedContract = await Contract.findByIdAndDelete(id);
    res.json(deletedContract);
  } catch (error) {
    throw new Error(error);
  }
});

const getContract = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaContract = await Contract.findById(id);
    res.json(getaContract);
  } catch (error) {
    throw new Error(error);
  }
});

const getallContract = asyncHandler(async (req, res) => {
  try {
    const getallContract = await Contract.find();
    res.json(getallContract);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createContract,
  updateContract,
  deleteContract,
  getContract,
  getallContract,
};
