const { users, movies} = require('../models/querys');
const dbconnect = require('../utils/dbConnect');


/**
 * 
 * @param {*} title 
 * @returns 
 */
const getsearchMovieByTitle = async (title) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(movies.getsearchMovieByTitle, [title]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }

}


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
const insertMovie = async (title, image_url, year_movie, director, genre_id, duration, synopsis) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(movies.insertMovie, [title, year_movie, director, genre_id, duration, synopsis]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }
}

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
const updateMovie = async (title, image_url, year_movie, director, genre_id, duration, synopsis, id) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(movies.updateMovie, [title, year_movie, director, genre_id, duration, synopsis, id]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const deleteMovie = async (id) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(movies.deleteMovie[id]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }

}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const deleteMovieFromFavorites = async (id) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(movies.deleteMovieFromFavorites, [id]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }

}

module.exports = {
    getsearchMovieByTitle,
    insertMovie,
    updateMovie,
    deleteMovieFromFavorites,
    deleteMovie
}