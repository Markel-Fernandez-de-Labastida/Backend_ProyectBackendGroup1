const { Router } = require("express");
const {
  getMovieByTitle,
  getUserFavorites,
  insertMovie,
  updateMovie,
  deleteMovieFromFavorites,
  deleteMovie,
} = require("../controllers/movies.controllers");

const upload = require("../utils/multer");

const routes = Router();

//routes.get('/search/:title',[] , '');

routes.get("/search", getMovieByTitle);

routes.get("/movies", getUserFavorites);

routes.post("/createMovie", upload.single("file"), insertMovie);

routes.put("/editMovie/:id", upload.single("file"), updateMovie);

routes.delete("/removeFavorites", deleteMovieFromFavorites);

routes.delete("/removeMovie", deleteMovie);

module.exports = routes;
