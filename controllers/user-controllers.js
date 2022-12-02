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
}