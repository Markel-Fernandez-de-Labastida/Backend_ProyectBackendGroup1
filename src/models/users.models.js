const { users, movies} = require('../models/querys');
const dbconnect = require('../utils/dbConnect');
let pool;




const getUserByEmail = async (email) => {
    try {
        
        const client = await pool.connect();
        
        const answer = client.query(users.getUserByEmail, [email]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;

    } catch (error) {
        return error
    }
}

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

const getUserFavorites = async (user) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(movies.getUserFavorites, [user]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }
}

const insertUser = async (name_user, email, password_hash, role_id) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(users.createUser, [name_user, email, password_hash, role_id]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }
}

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

const deleteMovie = async (id) => {
    try {
        const client = await pool.connect();
        
        const answer1 = client.query(movies.deleteMovieFromFavorites[id]);
        const answer2 = client.query(movies.deleteMovie[id]);
        console.log(answer2);

        console.log(answer2);
        client.release();
        return answer2.rows;
    } catch (error) {
        return error
    }

}

const updateUser = async (name, id) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(users.updateUser, [name, id]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }
}


module.exports = {
    getUserByEmail,
    getsearchMovieByTitle,
    getUserFavorites,
    insertUser,
    deleteMovieFromFavorites,
    deleteMovie,
    updateUser
};