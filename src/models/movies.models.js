const { users, movies } = require("../models/querys");
const { bdConnect } = require("../utils/dbConnect");
const pool = bdConnect();

/**
 *
 * @param {*} title
 * @returns
 */
const getsearchMovieByTitle = async (title) => {
  try {
    const client = await pool.connect();

    const answer = await client.query(movies.getsearchMovieByTitle, [title]);

    client.release();
    return answer.rows;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} user
 * @returns
 */
const getUserFavorites = async (user) => {
  try {
    const client = await pool.connect();

    const answer = await client.query(movies.getUserFavorites, [user]);
    console.log(answer);

    console.log(answer);
    client.release();
    return answer.rows;
  } catch (error) {
    throw error;
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
  try {
    const client = await pool.connect();

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
    console.log(answer);

    console.log(answer);
    client.release();
    return answer.rows;
  } catch (error) {
    throw error;
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
  try {
    const client = await pool.connect();

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
    console.log(answer);

    client.release();
    return answer.rows;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} id
 * @returns
 */
const delMovie = async (id) => {
  try {
    const client = await pool.connect();

    const answer = await client.query(movies.deleteMovie, [id]);
    //console.log(answer);
    client.release();
    return answer.rows;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} id
 * @returns
 */
const delMovieFromFavorites = async (movie_id, user_id) => {
  try {
    const client = await pool.connect();

    const answer = await client.query(movies.deleteMovieFromFavorites, [
      movie_id,
      user_id,
    ]);
    console.log(answer);

    console.log(answer);
    client.release();
    return answer.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getsearchMovieByTitle,
  getUserFavorites,
  addMovie,
  updtMovie,
  delMovieFromFavorites,
  delMovie,
};
