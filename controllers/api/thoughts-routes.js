const {Thought, User} = require("../../models");
const router = require("express").Router();

//get all thoughts 
Thought.get("/",(req, res)=>{
    Thought.find({})
    .select("__v")
    .sort({ _id: -1 })
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});