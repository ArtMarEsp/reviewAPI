const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ //The database for the signup and logins.
    _id: mongoose.Schema.Types.ObjectId,
    spId: {type: String, required: true, unique: true },
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema); //Export the user schema.