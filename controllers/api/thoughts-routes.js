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

// get thought 
router.get("/:id", (req, res) => {
  Thought.findOne({_id: req.params.id })
  .select("-__v")
  .then((dbThoughtData) => res.json(dbThoughtData))
  .catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });
});

// add a thought
router.post("/", (req, res) => {
  Thought.create(req.body)
  .then((dbThoughtData) => {
    return User.findOneAndUpdate(
      {_id: req.body.userId },
      {$push: {thoughts: dbThoughtData._id} },
      { new: true}
    );
  })
  .then((dbUserData) => {
    id(!dbUserData) {
      res.status(404).json({message: "invaild user id."});
      return;
    }
    res.jsin(dbUserData);
  })
  .catch((err) => res.json(err));
});

//update thougt
router.put("/:id", ({params, body}, res) => {
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

/