const { Router } = require("express");
const { check } = require("express-validator");
const { validateInput } = require("../middleware/validateInput");
const {
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  insertMovie,
  updateMovie,
  deleteMovieFromFavorites,
  deleteMovie,
} = require("../controllers/movies.controllers");

const upload = require("../utils/multer");
const { getsearchMovieById } = require("../models/movies.models");

const routes = Router();

//routes.get('/search/:title',[] , '');

routes.get("/getAllMovies", getAllMovies);
routes.post("/searchId", getMovieById);
routes.post("/search", getMovieByTitle);

routes.post(
  "/createMovie",
  [
    check("title", "Titulo vacio").notEmpty().isString(),
    check("year_movie", "Año vacio").notEmpty().isString(),
    check("director", "Director vacio").notEmpty().isString(),
    check("genre_id", "Géreno vacio").notEmpty(),
    validateInput,
  ],
  upload.single("file"),
  insertMovie
);

routes.put("/editMovie/:id", upload.single("file"), updateMovie);

routes.delete("/removeFavorites", deleteMovieFromFavorites);

routes.delete("/removeMovie", deleteMovie);

module.exports = routes;
