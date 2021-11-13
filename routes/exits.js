const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Exit = require('../models/review'); //imports the review schema.

router.get('/', function(req,res){ // This is the page that appears after the user finish their playing session.
    const id = new mongoose.Types.ObjectId();
    res.status(201).json({
        message: "Thanks for playing! We would really appreciate it if you could share your feedback about your experience in the game. Please use this id to do so: " + id + " You can use it in localhost:3000/exit/yourId.",
    });
});

router.post('/:sessionId', function(req,res){ //Here is where they post their review using the sessionId wich is unique.
    Exit.findOne({_id: req.params.sessionId},function(err, foundReview){
        if(foundReview){
            return res.status(409).json({
                message: 'A review with that sessionId already exist.'
            });
        } else {
            const newReview = new Exit ({
                _id: req.params.sessionId,
                rate: req.body.rate,
                comment: req.body.comment
            });
            if(newReview.rate > 5){
                res.send("Your rating must be from 1 to 5");
            } 
            if(newReview.rate < 1){
                res.send("Your rating must be from 1 to 5");
            } else {
                newReview.save();
                res.send("Succesfully saved your review, thanks for your time!");
            }
        }
    });
});

module.exports = router;