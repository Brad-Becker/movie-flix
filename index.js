let users = [{
        id: 1,
        fullname: 'Bob Kyle',
        email: 'johndoe@mail.com',
        favMovies: [2]
    },
    {
        id: 2,
        fullname: 'Smith Jane',
        email: 'smithjane@mail.com',
        favMovies: [1,2]
    }

];
let movies = [{
        id:1,
        title: 'Inception',
        director: 'Christopher Nolan',
        genre: 'Sci-Fi'
    },
    
    {
         id: 2,
        title: 'Lord of the Rings',
        director: 'Peter Jackson',
        genre: 'Super-Heroes'
    },
    {
         id: 3,
        title: 'The Matrix',
        director: 'Lana Wachowski',
        genre: 'Sci-fi'
    },
    {
         id: 4,
        title: 'The Avengers',
        director: 'Anthony Russo',
        genre: 'Super-Heroes'
    },
   ];

const express = require('express');
morgan = require('morgan');

const app = express();
const PORT = 8080;
//Using the Morgan middleware library to log all requests
app.use(morgan('common'));
app.use(express.json());

//GET request for returning the JSON movie data
app.get('/movies', (req, res) => {
    res.json(movies);
});

//GET request for returning the personal message
app.get('/', (req, res) => {
    res.send('Welcome to my flix!');
});

//Using express.static to serve the documentation.html file
app.use(express.static('public'));

//Creating an error-handling middleware function that will log all application-level errors to the terminal
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops!Something Went Wrong!');
});

//For returning data about a single movie
app.get('/movie/:title', (req, res) => {
    const movie = movies.find((m) => m.title == req.params.title);
    res.send(movie);
});

//For returning data about a genre
app.get('/genres/:genre', (req, res) => {
    const movies_ = movies.filter((m) => m.genre == req.params.genre);
    res.send(movies_);
});

//For returning data about a director by name
app.get('/directors/:director', (req, res) => {
    const director = movies.filter((m) => m.director == req.params.director);
    res.send(director);
});

//For allowing new users to register
app.post('/users/register', (req, res) => {
    users.push(req.body);
    res.send('Registeration Successful!');
});
app.get('/users', (req, res) => {
    res.send(users);
});

//For allowing users to update their user info
app.put('/users/:id', (req, res) => {
    let userId = users.findIndex((u) => u.id == req.params.id);
    users.slice(userId, 1, {
        ...req.body
    });
    res.send('Changes saved successfully!');
    res.send(users);
});

//For allowing users to add a movie to their list of favorite movies
app.post('/users/:id/favorites', (req, res) => {
    const user = users.find((u) => u.id == req.params.id);
    user.favMovies.push(req.body);
    res.send(user);
});

//For allowing users to remove a movie from their list of favorites movies-text
app.delete('/users/:id/favorite', (req, res) => {
    const user = users.find((u) => u.id == req.params.id);
    const favs = user.favMovies.filter((m) => m.title != req.params.title)
    user.favMovies = [...favs];
    res.send(user);
});

//For allowing existing users to deregister-text
app.delete('/users/deregister/:id', (req, res) => {
    users.filter((m) => m.id != req.params.id);
    res.send('User details successfully removed!')
});

//Listening requests
app.listen(PORT, () => {
    console.log(`Your SERVER is listening on port ${PORT}.`);
});