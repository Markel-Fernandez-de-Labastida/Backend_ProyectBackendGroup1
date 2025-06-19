const {
  checkMovExists,
  getsearchMovieByTitle,
  addMovie,
  updtMovie,
  delMovieFromFavorites,
  delMovie,
} = require("../models/movies.models");

const getMovieByTitle = async (req, res) => {
  const { title } = req.body;
  try {
    //await
    const movies = await getsearchMovieByTitle(title);
    console.log("pelis: ", movies);
    if (movies.length <= 0) {
      return res.status(404).json({
        ok: false,
        msg: "La pelicula no existe",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "entra en getMovieByTitle",
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

const getUserFavorites = async (req, res) => {
  const { id_user } = req.body;
  try {
    const movie = await getUserFavorites(id_user);
    if (!movie) {
      return res.status(404).json({
        ok: false,
        msg: "Error al mostrar las peliculas favoritas del usuario",
      });
    } else {
      return res.status(201).json({
        ok: true,
        msg: "Pelicula favoritas",
        data: movie,
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

const insertMovie = async (req, res) => {
  //   console.log("file", req.file);
  const { filename, originalname, mimetype, size, path } = req.file;
  const { title, year_movie, director, genre_id, duration, synopsis } =
    req.body;
  //   console.log(req.body);

  const newFilm = {};
  try {
    const movie = await addMovie(
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

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { filename, originalname, mimetype, size, path } = req.file;
  const { title, year_movie, director, genre_id, duration, synopsis } =
    req.body;
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
    console.log("peli: ", movie);
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

const deleteMovie = async (req, res) => {
  console.log(req.body);
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
        msg: "Error al elimina pelicula",
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
  getMovieByTitle,
  getUserFavorites,
  insertMovie,
  updateMovie,
  deleteMovieFromFavorites,
  deleteMovie,
};
