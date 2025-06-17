const { users, movies} = require('../models/querys');
const dbconnect = require('../utils/dbConnect');
let pool;



const getAllUsers = async () => {
    try {
        
        const client = await pool.connect();
        
        const answer = client.query(users.getAllUsers);
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
 * @param {*} email 
 * @returns 
 */
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



/**
 * 
 * @param {*} user 
 * @returns 
 */
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

/**
 * 
 * @param {*} name_user 
 * @param {*} email 
 * @param {*} password_hash 
 * @param {*} role_id 
 * @returns 
 */
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





/**
 * 
 * @param {*} name 
 * @param {*} id 
 * @returns 
 */
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

/**
 * 
 * @param {*} id 
 * @returns 
 */
const deleteUser = async (id) => {
    try {
        const client = await pool.connect();
        
        const answer = client.query(users.deleteUser, [id]);
        console.log(answer);

        console.log(answer);
        client.release();
        return answer.rows;
    } catch (error) {
        return error
    }
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserFavorites,
    insertUser,
    updateUser,
    deleteUser,
};