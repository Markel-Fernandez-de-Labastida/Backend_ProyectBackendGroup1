const { checkMovExists } = require("../models/movies.models");
const {
  getUserRol,
  addFavorite,
  getAllFavorites,
  checkUsrExists,
} = require("../models/users.models");

/**
 * Función para obtener el rol del usuario.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Devuelve un objeto con el rol del usuario.
 */
const getUserRole = async (req, res) => {
  const { id_user } = req.body;
  try {
    const exists = await checkUsrExists(id_user);
    if (!exists) {
      return res.status(404).json({
        ok: false,
        msg: "El id del usuario no existe",
      });
    }
    const role = await getUserRol(id_user);
    if (!role) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "rol capturado correctamente",
        data: role,
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
 * Función para obtener las películas favoritas de un usuario.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Devuelve un objeto con las películas marcadas como favoritas por un usuario.
 */
const getUserFavorites = async (req, res) => {
  const { id_user } = req.body;
  const exists = await checkUsrExists(id_user);
  if (!exists) {
    return res.status(404).json({
      ok: false,
      msg: "El id del usuario no existe",
    });
  }
  try {
    const movie = await getAllFavorites(id_user);
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

/**
 * Función para añadir una película a favoritos.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Añade la película a favoritos en la base de datos.
 */
const addFavourite = async (req, res) => {
  const { id_user, id_movie } = req.body;
  try {
    const exists = await checkUsrExists(id_user);
    if (!exists) {
      return res.status(404).json({
        ok: false,
        msg: "El id del usuario no existe",
      });
    }
    const existMovie = await checkMovExists(id_movie);
    if (existMovie.length <= 0) {
      return res.status(404).json({
        ok: false,
        msg: "El id del movie no existe",
      });
    }
    const user = await addFavorite(id_user, id_movie);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "La pelicula no existe",
      });
    } else {
      return res.status(201).json({
        ok: true,
        msg: "Pelicula añadida a favoritos",
        data: user,
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
  getUserRole,
  getUserFavorites,
  addFavourite
};
