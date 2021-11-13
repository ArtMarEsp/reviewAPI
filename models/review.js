const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({  //This is the database for the reviews.
    _id: mongoose.Schema.Types.ObjectId,
    rate: {type: Number, required: true},
    comment: {type: String}
});

module.exports = mongoose.model('Review', reviewSchema); //Exports the review schema.