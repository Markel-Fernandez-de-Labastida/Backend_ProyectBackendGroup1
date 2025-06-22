const { users, movies } = require("../models/querys");
const { bdConnect } = require("../utils/dbConnect");

/**
 * Función para obtener todas las películas de la base de datos.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL, devuelve los datos y libera la conexión.
 * @returns Devuelve un array con el resultado.
 */
const getAllMovie = async () => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.getAllMovies);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Función para verificar si una película existe según su id.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL, devuelve los datos y libera la conexión.
 * @param {Number} id id de la película.
 * @returns Devuelve el id de la película en caso de existir.
 */
const checkMovExists = async (id_movie) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.checkMovieExists, [id_movie]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};


/**
 * Función para obtener una película según su id.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL, devuelve los datos y libera la conexión.
 * @param {Number} id id de la película
 * @returns Devuelve un array con el resultado.
 */
const getsearchMovieById = async (id) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.getsearchMovieById, [id]);

    return answer.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Función para obtener una película según su título.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL, devuelve los datos y libera la conexión.
 * @param {String} title título de la película
 * @returns Devuelve un array con el resultado.
 */
const getsearchMovieByTitle = async (title) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.getsearchMovieByTitle, [title]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Función para añadir una película a la base de datos
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @param {String} title título de la película
 * @param {String} image_url url de la imagen
 * @param {Number} year_movie año de estreno de la película
 * @param {String} director nombre del director/a
 * @param {Number} genre_id id del género
 * @param {Stirng} duration duración de la película
 * @param {String} synopsis Sinopsis
 * @returns Inserta la película en la base de datos.
 */

const addMovie = async (
  title,
  image_url,
  image_name,
  year_movie,
  director,
  genre_id,
  duration,
  synopsis
) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.insertMovie, [
      title,
      image_url,
      image_name,
      year_movie,
      director,
      genre_id,
      duration,
      synopsis,
    ]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Función para editar una película
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @param {String} title título de la película
 * @param {String} image_url url de la imagen
 * @param {Number} year_movie año de estreno de la película
 * @param {String} director nombre del director/a
 * @param {Number} genre_id id del género
 * @param {Stirng} duration duración de la película
 * @param {String} synopsis Sinopsis
 * @param {Number} id id de la película
 * @returns Edita la película de la base de datos
 */

const updtMovie = async (
  id_movie,
  title,
  image_url,
  image_name,
  year_movie,
  director,
  genre_id,
  duration,
  synopsis
) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.updateMovie, [
      id_movie,
      title,
      image_url,
      image_name,
      year_movie,
      director,
      genre_id,
      duration,
      synopsis,
    ]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Función para eliminar una película de la base de datos según su id.
 * @param {Number} id id de la película
 * @returns Elimina la película
 */
const delMovie = async (id) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.deleteMovie, [id]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Función para eliminar una película de favoritos en la base de datos.
 * @param {Number} id id de la película
 * @returns Elimina la película de favoritos.
 */
const delMovieFromFavorites = async (movie_id, user_id) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.deleteMovieFromFavorites, [
      movie_id,
      user_id,
    ]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getAllMovie,
  checkMovExists,
  getsearchMovieById,
  getsearchMovieByTitle,
  addMovie,
  updtMovie,
  delMovieFromFavorites,
  delMovie,
};
