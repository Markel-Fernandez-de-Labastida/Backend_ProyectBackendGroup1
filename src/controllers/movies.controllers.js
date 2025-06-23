const {
  getAllMovie,
  checkMovExists,
  getsearchMovieById,
  getsearchMovieByTitle,
  addMovie,
  updtMovie,
  delMovieFromFavorites,
  delMovie,
} = require("../models/movies.models");

/**
 * Función que devuelve todas las películas.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Devuelve un objeto con todas las películas y sus datos.
 */
const getAllMovies = async (req, res) => {
  try {
    const movies = await getAllMovie();
    if (movies.length <= 0) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ninguna pelicula",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "Peliculas encontradas",
        data: movies,
      });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      ok: false,
      msg: "Error. Contacte con el administrador",
    });
  }
};

/**
 * Función que devuelve una película según su id.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Devuelve un objeto con la película según su id
 */
const getMovieById = async (req, res) => {
  const { id_movie } = req.body;
  if (id_movie === "") {
    throw res.status(404).json({
      ok: false,
      msg: "No puedes dejar vacio el id",
    });
  }
  try {
    const movies = await getsearchMovieById(id_movie);
    if (!movies || movies.length <= 0) {
      return res.status(404).json({
        ok: false,
        msg: "La pelicula no existe",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "Pelicula encontrada",
        data: movies,
      });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      ok: false,
      msg: "Error. Contacte con el administrador",
    });
  }
};

/**
 * Función que devuelve películas según su título.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Devuelve un objeto con las películas que coincidan con una palabra clave.
 */
const getMovieByTitle = async (req, res) => {
  const { title } = req.body;
  if (title === "") {
    throw res.status(404).json({
      ok: false,
      msg: "No puedes dejar vacio el titulo",
    });
  }
  try {
    const movies = await getsearchMovieByTitle(title);
    if (movies.length <= 0) {
      return res.status(404).json({
        ok: false,
        msg: "La pelicula no existe",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "Pelicula encontrada",
        data: movies,
      });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      ok: false,
      msg: "Error. Contacte con el administrador",
    });
  }
};

/**
 * Función para crear una película
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Guarda la película creada en la base de datos.
 */
const insertMovie = async (req, res) => {
  console.log('entra en insermovie')
  // console.log(req.file)
  console.log(req.body)
  // const { filename, originalname, mimetype, size, path } = req.file;
  const { title, year_movie, director, genre_id, duration, synopsis } = req.body;
  try {
    const movie = await addMovie(
      title,
      /* path,
      originalname, */
      'https://s.cdnshm.com/catalog/es/t/691578562/erik-editores-marvel-spider-man-gotcha-poster-91-5x61-cm.jpg',
      'originalname text',
      year_movie,
      director,
      genre_id,
      duration,
      synopsis
    );
    if (!movie) {
      return res.status(404).json({
        ok: false,
        msg: "Error al insertar pelicula",
      });
    }
    return res.status(201).json({
      ok: true,
      msg: "Pelicula insertda",
      movie,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      ok: false,
      msg: "Error. Contacte con el administrador",
    });
  }
};

/**
 * Función para editar una película.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Actuliza la película con los nuevos valores en la base de datos.
 */
const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { filename, originalname, mimetype, size, path } = req.file;
  const { title, year_movie, director, genre_id, duration, synopsis } = req.body;
  try {
    const exists = await checkMovExists(id);
    if (exists.length <= 0) {
      return res.status(404).json({
        ok: false,
        msg: "El id de la pelicula no existe",
      });
    }
    const movie = await updtMovie(
      id,
      title,
      path,
      originalname,
      year_movie,
      director,
      genre_id,
      duration,
      synopsis
    );
    if (!movie) {
      return res.status(404).json({
        ok: false,
        msg: "Error al modificar pelicula",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "Pelicula modificada",
        movie,
      });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      ok: false,
      msg: "Error. Contacte con el administrador",
    });
  }
};

/**
 * Función para eliminar películas de favoritos.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Elimina la película de los favoritos del usuario en la base de datos.
 */
const deleteMovieFromFavorites = async (req, res) => {
  const { movie_id, user_id } = req.body;
  try {
    const movie = await delMovieFromFavorites(movie_id, user_id);
    if (!movie) {
      return res.status(404).json({
        ok: false,
        msg: "Error al elimina pelicula de los favoritos",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "Pelicula eliminada de favoritos",
      });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      ok: false,
      msg: "Error. Contacte con el administrador",
    });
  }
};

/**
 * Función para eiminar una película.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Elimina una película de la base de datos.
 */
const deleteMovie = async (req, res) => {
  const { id } = req.body;
  try {
    const exists = await checkMovExists(id);
    if (exists.length <= 0) {
      return res.status(404).json({
        ok: false,
        msg: "El id de la pelicula no existe",
      });
    }
    const movie = await delMovie(id);
    if (!movie) {
      return res.status(404).json({
        ok: false,
        msg: "Error al eliminar pelicula",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "Pelicula eliminada",
      });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      ok: false,
      msg: "Error. Contacte con el administrador",
    });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  insertMovie,
  updateMovie,
  deleteMovieFromFavorites,
  deleteMovie,
};
