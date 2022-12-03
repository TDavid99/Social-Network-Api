const { User, Thought } = require("../models");
 
const userController = {
    //get all users 
    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //get single user by id 
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: 'invaild id '});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //create a user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    },
    //update a user 
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {
            $set: req.body,                                                                                                                                                                                                                                                             
            },
            {
                runValidators: true, 
                new: true,
                
            }
            )
            .then((dbUserData) => {
                if(~dbUserData) {
                    return res.status (404).json({message: "invaild user" })
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        },
        //remove user 
        deleteUser(req, res) {
            User.findOneAndDelete({_id: req.params.userId})
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({message: "invaild user id"});
                }
                //delete users and Id's thoughts
                return Thought.deleteMany({_id: {$in: dbUserData.thoughts }});
            })
            .then(() => {
                res.json({message: "deleted user thoughts "});
            })
            .catch((err) => {
                res.status(500).json(err);

            });
        },

        //add friends
        addFriends(req, res) {
            User.findOneAndUpdate(
                { _id: req.params.user.userId}, 
                {$addToset: {friends: req.params.friendId} }, {new: true})
                .then((dbUserData) => {
                   if(!dbUserData) {
                return res.status(404).json({message: "invaild id" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},
//remove friends
removeFriend(req,res) {
    User.findOneAndUpdate({ _id: req.params.userId}, {$pull: {friends: req.params.friendId} }, {new: true})
    .then((dbUserData) => {
        if(!dbUserData) {
            return res.satus(404).json({message: "invaild id"});

        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console/log(err);
        res.status(500).json(err);
    });
}
}; 

module.exports = userController;