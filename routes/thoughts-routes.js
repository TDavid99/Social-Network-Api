const Thought = require("../models/Thoughts");
const User= require ("../models/User");
const ThoughtRouter = require("express").Router();

//get all thoughts 
ThoughtRouter.get("/",(req, res) => {
    Thought.find({})
    .select("__v")
    .sort({ _id: -1 })
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// get thought 
ThoughtRouter.get("/:id", (req, res) => {
  Thought.findOne({_id: req.params.id })
  .select("-__v")
  .then((dbThoughtData) => res.json(dbThoughtData))
  .catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });
});

// add a thought
ThoughtRouter.post("/", (req, res) => {
  Thought.create(req.body)
  .then((dbThoughtData) => {
    return User.findOneAndUpdate(
      {_id: req.body.userId },
      {$push: {thoughts: dbThoughtData._id} },
      { new: true}
    );
  })
  .then((dbUserData) => {
    if(!dbUserData) {
      res.status(404).json({message: "invaild user id."});
      return;
    }
    res.json(dbUserData);
  })
  .catch((err) => res.json(err));
});

//update thougt
ThoughtRouter.put("/:id", ({params, body}, res) => {
  Thought.findOneAndUpdate({ _id: params.id}, body, {
    new: true,
    runValidators: true,
  })
  .then((dbThoughtData) => {
    if(!dbThoughtData) {
      res.status(404).json({ message: " invaild user id."});
      return;
    }
    res.json(dbThoughtData);
  })
  .catch((err) => res.json(err));
});

// delete a thought

ThoughtRouter.delete("/:thoughtId", (req, res) => {
  Thought.findOneAndDelete({ _id: req.params.thoughtId})
  .then((deletedThought) =>{
    if(!deletedThought) {
      return res.status(404).json({ message: "invaild "});
    }
    return User.findOneAndUpdate(
      {thoughts: req.params.thoughtId }, 
      {$pull: {thought: req.params.thoughtId} },
      {new: true}

    );
  })
  .then((dbUserData) => {
    if(!dbUserData) {
      res.status(404).json({message: "invaild user id "});
      return;
    }
    res.json(dbUserData);
  })
  .catch((err) => res.json(err));
});

// add a reaction  
ThoughtRouter.post("/:thougthtId/reactions", (req, res) => {
  Thought.findOneAndUpdate(
  {_id: req.params.thougthtId },
  {
    $addToSet: {
      reactions: {
        reactionBody: req.body.reactionBody,
      },
    },
  },
  { new: true }
)
  .then((dbThoughtData) => res.json(dbThoughtData))
  .catch((err) => res.json(err));
});
  
//delete a reaction
ThoughtRouter.delete("/:thoughtId/reactions/:reactionId ", (req, res) => {
  Thought. findOneAndUpdate(
    {_id:req.params.thoughtId },
    { $pull: { reactions: { _id: req.params.reactionId } } },
    { new: true }
  )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err));
});

module.exports = ThoughtRouter
