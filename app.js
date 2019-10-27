const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Passport Config

require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
	res.send('It works');
});

//use Routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server Started on port ${port}`);
}); 

