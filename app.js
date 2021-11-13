const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //This is so we can use MongoDB, a NoSql Database.
require("dotenv").config();

const reviewRoutes = require('./routes/reviews'); //Imports the reviews.js file
const exitRoutes = require('./routes/exits'); //Imports the exits.js file
const userRoutes = require('./routes/users'); //Imports the exits.js file

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Superior:Contraseña123@cluster0.9rdwf.mongodb.net/scpChallenge?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}); //We connecto the MongoDB database that is in the cloud.

app.use('/reviews', reviewRoutes); //We use the reviews.js file
app.use('/exits', exitRoutes); //We use the exits.js file
app.use('/users', userRoutes); //We use the users.js file

module.exports = app;