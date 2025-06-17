const {Router} = require('express');
const {
    getMovieByTitle,
    getUserFavorites,
    insertMovie,
    updateMovie,
    deleteMovieFromFavorites,
    deleteMovie
} = require('../controllers/movies.controllers')

const routes = Router();

routes.get('/search/:title', [] , getMovieByTitle);

routes.get('/search', [], );

routes.get('/movies', [], getUserFavorites);

routes.post('/createMovie', [], '');

routes.put('/editMovie/:id', [], '');

routes.delete('removeMovie', [], '');