const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //This is so the passwords are encrypted
const jwt  = require('jsonwebtoken'); //This is for the Authorization token.
require("dotenv").config(); //This is so we can use the .env file

const User = require('../models/user'); //Imports the User Schema.

router.post('/signup', function(req, res) { //Here yo can signup, create a spId and a password.
    User.findOne({spId: req.body.spId},function(err, spUser){
        if(spUser){
            return res.status(409).json({
                message: 'That user already exist.'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                } else {
                    const spUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    spId: req.body.spId,
                    password: hash
                    });
                    spUser.save();
                    res.send("Succesfully created your user");
                }        
            })
        }
    });
});

router.post('/login', function(req, res) { //Here is the login, you must access with your spId and password to get your Authorization token.
    User.findOne({spId: req.body.spId},function(err, spUser){
        if(spUser){
            bcrypt.compare(req.body.password, spUser.password, (err, result) => { //Here you check that the passwords coincide.
                if (err) {
                    return res.status(401).json({
                        message: 'Auth Fail'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        spId: spUser.spId,
                        _id: spUser._id
                    }, 
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: 'Auth Succesfull',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Auth Fail'
                });
            });
        } else {
            return res.status(409).json({
                message: 'Auth fail'
            });
        } 
    });
});

router.delete('/:spId', function(req, res) { // This is just for deleting users.
    User.deleteOne({spId: req.params.spId}, function(result) {
        res.status(200).json({
            message: 'User deleted'
        })
    });
});

module.exports = router;