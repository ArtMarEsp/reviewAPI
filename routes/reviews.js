const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuto = require('../Middleware/check-auto');

const Review = require('../models/review'); //Imports the review schema

router.get('/', checkAuto ,function(req, res){ //Here you get ALL the reviews that are stored in the data base, you must grant the Authorization token to access.
    Review.find(function(err, foundReview){ //ex. localhost:3000/reviews
        if(!err){
            res.send(foundReview);
        } else {
            res.send("Error!");
        }
    });
});

router.get('/last', checkAuto ,function(req, res){// Here you get the last 10 reviews that are stored in the data base, you must grant the Authorization token to access.
    Review.find(function(err, foundReview){ //ex. localhost:3000/reviews/last
        if(!err){
            res.send(foundReview.slice(-10));
        } else {
            res.send("Error!");
        }
    });
});

router.get("/rating/:value",function(req, res){ //Here you can see all the reviews filtered by rating, the Authorization token is not required.
    const n = req.params.value; //ex. localhost:3000/reviews/rating/5
    Review.find({rate: req.params.value}, function(err, foundReviews){
        if(foundReviews){
            res.send(foundReviews);
        } else {
            res.send("No reviews found with that rating");
        }
    });
});

router.post('/', function(req, res){ //Here you can post a new review, this one was used to fill the database and make tests.
     const newReview = new Review ({
        _id: new mongoose.Types.ObjectId(),
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
            res.send("Succesfully save your review");
        }
});
router.delete('/',function(req,res){ //Here you can delete all the reviews in the database.
    Review.deleteMany(function(err){
        if(!err){
            res.send("Success on deleting!");
        } else {
            res.send("Error");
        }
    });
});

module.exports = router;