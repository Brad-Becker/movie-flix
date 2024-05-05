const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { Movie, User } = require('./models'); // No need for '.js'

const app = express();
const PORT = 8080;

// Updated MongoDB connection string without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/movieFlixDB');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(morgan('common'));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to my movie flix!');
});

// Define other API routes here as needed

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});
