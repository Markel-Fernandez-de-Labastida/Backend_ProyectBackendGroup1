/**
 * Importaciones
 */
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
const { validateJWT } = require("../middleware/verifyToken");
const { verifyRole } = require("../middleware/verifyRole");

const routes = Router();

/**
 * Rutas gestión de películas
 */
routes.get("/getAllMovies", /* [validateJWT, verifyRole('admin')], */ getAllMovies);
routes.post("/searchId", /* validateJWT, */ getMovieById);
routes.post("/search", /* [validateJWT, verifyRole('user')], */ getMovieByTitle);

routes.post(
  "/createMovie",
  [
    check("title", "Titulo vacio").notEmpty().isString(),
    check("year_movie", "Año vacio").notEmpty().isString(),
    check("director", "Director vacio").notEmpty().isString(),
    check("genre_id", "Géreno vacio").notEmpty(),
    validateInput,
    /* validateJWT,
    verifyRole('admin') */
  ],
  upload.single("file"),
  insertMovie
);

routes.put("/editMovie/:id", upload.single("file"), /* [validateJWT, verifyRole('admin')], */ updateMovie);

routes.delete("/removeFavorites", /* [validateJWT, verifyRole('user')], */ deleteMovieFromFavorites);

routes.delete("/removeMovie", /* [validateJWT, verifyRole('admin')], */ deleteMovie);

module.exports = routes;
