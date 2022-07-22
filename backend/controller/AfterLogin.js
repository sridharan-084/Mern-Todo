const express = require("express");
const Task = require("../models/Task");
const checkAuth = require("../auth/auth");

const ADD = async (req, res) => {
  const { task, id } = req.body;
  // console.log(task, id);
  try {
    const newtask = await Task.create({ task: task, UserId: id });
    res.status(200).json({ data: newtask });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const Data = async (req, res) => {
  try {
    // console.log(req.body.UserId);
    // console.log(typeof req.body.UserId);
    const ALLDATA = await Task.find({ UserId: req.body.UserId });
    res.status(200).json({ data: ALLDATA });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const id = req.body.key;
    const UserId = req.body.id;
    // console.log(id, UserId);
    const user = await Task.findByIdAndDelete({ _id: id });
    const ALLDATA = await Task.find({ UserId: UserId });
    res.status(200).json({ data: ALLDATA });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const UpdateTask = async (req, res) => {
  const { task, id, ele } = req.body;
  // console.log(task, id, ele);
  try {
    const update = await Task.findByIdAndUpdate({ _id: ele }, { task: task });
    const ALLDATA = await Task.find({ UserId: id });
    res.status(200).json({ data: ALLDATA });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { ADD, Data, DeleteTask, UpdateTask };
