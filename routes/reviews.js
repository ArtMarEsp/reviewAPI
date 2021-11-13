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
            res.send(foundReview.slice(0,10));
        } else {
            res.send("Error!");
        }
    });
});



router.get("/rating/:value",function(req, res){ //Here you can see all the reviews filtered by rating, you ,ust gran the Authorization token.
    const n = req.params.value; //ex. localhost:3000/reviews/rating/5
    Review.find({rate: req.params.value}, function(err, foundReviews){
        if(n == 5){
            if(foundReviews){
                res.status(200).json({
                    foundReviews
                });
            } else {
                res.send("No reviews match the rating");
            }
        } 
        if(n == 4){
            if(foundReviews){
                res.status(201).json({
                    foundReviews
                });
            } else {
                res.send("No reviews match the rating");
            }
        } 
        if(n == 3){
            if(foundReviews){
                res.status(202).json({
                    foundReviews
                });
            } else {
                res.send("No reviews match the rating");
            }
        } 
        if(n == 2){
            if(foundReviews){
                res.status(203).json({
                    foundReviews
                });
            } else {
                res.send("No reviews match the rating");
            }
        } 
        if(n == 1){
            if(foundReviews){
                res.status(204).json({
                    foundReviews
                });
            } else {
                res.send("No reviews match the rating");
            }
        } else {
            res.send("Invalidad rating");
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