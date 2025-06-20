const { checkMovExists } = require("../models/movies.models");
const {
  getUserRol,
  addFavorite,
  getAllFavorites,
  checkUsrExists,
} = require("../models/users.models");

const getUserRole = async (req, res) => {
  const { id_user } = req.body;
  try {
    //await
    const exists = await checkUsrExists(id_user);
    if (!exists) {
      return res.status(404).json({
        ok: false,
        msg: "El id del usuario no existe",
      });
    }
    const role = await getUserRol(id_user);
    console.log(role);
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

const getUserFavorites = async (req, res) => {
  console.log("bodyFavorites: ", req.body);
  const { id_user } = req.body;
  console.log("id_user: ", id_user);
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

const addFavourite = async (req, res) => {
  // preguntar como conseguir los dos ids (el del usuario y el de la pelicula)
  const { id_user, id_movie } = req.body;
  try {
    //await
    const exists = await checkUsrExists(id_user);
    if (!exists) {
      return res.status(404).json({
        ok: false,
        msg: "El id del usuario no existe",
      });
    }
    const existMovie = await checkMovExists(id_movie);
    //console.log("PELI: ", existMovie);
    if (existMovie.length <= 0) {
      return res.status(404).json({
        ok: false,
        msg: "El id del movie no existe",
      });
    }
    const user = await addFavorite(id_user, id_movie);
    console.log(user);
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

module.exports = { getUserRole, getUserFavorites, addFavourite };
