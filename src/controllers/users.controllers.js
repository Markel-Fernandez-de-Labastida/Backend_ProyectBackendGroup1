const { addFavorite } = require("../models/users.models");

const addFavourite = async (req, res) => {
  // preguntar como conseguir los dos ids (el del usuario y el de la pelicula)
  const { id_user, id_movie } = req.body;
  try {
    //await
    const user = await addFavorite(id_user, id_movie);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "La pelicula no existe",
      });
    } else {
      return res.status(200).json({
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

module.exports = { addFavourite };
