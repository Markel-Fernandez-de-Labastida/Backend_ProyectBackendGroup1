const { users, movies } = require("../models/querys");
const { bdConnect } = require("../utils/dbConnect");
//const pool = bdConnect();
console.log("Mivies: ");

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
 *
 * @param {*} title
 * @returns
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
 *
 * @param {*} title
 * @param {*} image_url
 * @param {*} year_movie
 * @param {*} director
 * @param {*} genre_id
 * @param {*} duration
 * @param {*} synopsis
 * @returns
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
 *
 * @param {*} title
 * @param {*} image_url
 * @param {*} year_movie
 * @param {*} director
 * @param {*} genre_id
 * @param {*} duration
 * @param {*} synopsis
 * @param {*} id
 * @returns
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
 *
 * @param {*} id
 * @returns
 */
const delMovie = async (id) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.deleteMovie, [id]);
    //console.log(answer);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

/**
 *
 * @param {*} id
 * @returns
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
  checkMovExists,
  getsearchMovieById,
  getsearchMovieByTitle,
  addMovie,
  updtMovie,
  delMovieFromFavorites,
  delMovie,
};
