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
// },
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
updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$set: body}, {new: true, runValidators: true})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: "invaild thought id"});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
},

deleteThought({params}, res) {
    Thought.findOneDelete({_id:params.thoughtId})
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: "invaild thought id"});
            return;
        }
        return User.findOneAndUpdate(
            {thoughts: params.thoughtId},
            {$pull: {thoughts: params.thoughtId}},
            {new: true}
        );
    })
    .then(dbUsersData => {
        if(!dbUsersData) {
        res.status(404).json({message: "invaild user id"});
        return;
        
    }
    res.json({message: "thought deleted"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);

    });
},
// reaction to thought
addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$addToSet: {reactions: body}},
        {new: true, runValidators: true}
    )
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: "invaild user id"});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  },
    //remove reaction 

        removeReaction({params}, res) {
            Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$pull:{reactions: {reactionId: params.reactionId}}},
                {new: true, runValidators: true}
            )
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({message: "invaild was id "});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        }

};


module.exports = thoughtController; 

