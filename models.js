const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    genre: {
        name: String,
        description: String
    },
    director: {
        name: String,
        bio: String,
        birthYear: Number,
        deathYear: Number
    },
    imageURL: String,
    featured: Boolean
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: Date,
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Movie, User };
