const { Thought, User} = require("../models");

const thoughtController = {
    //find all thoughts 
    getAllThoughts( req, res) {
        Thought.find()
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //find a single Thought by id 
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
        .select('-__v')
        .then(dbThoughtsData => {
            //
            if (!dbThoughtsData) {
                res.status(404).json ({message: "invaild id "});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //create a thought 
},
createThought({body}, res) {
    Thought.create(body)
    .then((dbThoughtsData) => {
        return User.findOneAndUpdate(
            {_id: body.userId},
            {$push: {thoughts: dbThoughtsData._id}},
            {new: true}
        );
    })
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: "invaild user id"});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},

