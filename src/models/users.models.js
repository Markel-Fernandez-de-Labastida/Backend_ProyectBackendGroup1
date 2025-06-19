const { users, movies} = require('../models/querys');
const {bdConnect} = require('../utils/dbConnect')
//const pool = bdConnect()


const getAllUsers = async () => {
    let client;
    const pool = bdConnect();
    try {
        client = await pool.connect()
        console.log('client:', client)
        const answer = await client.query(users.getAllUsers);
        
        return answer.rows;

    } catch (error) {
        console.log('error modelo', error)
        throw error
    } finally {
        client.release();
    }
}

/**
 * 
 * @param {*} email 
 * @returns 
 */
const getUserByEmail = async (email) => {
    let client;
    const pool = bdConnect();
    try {
        
        client = await pool.connect();
        
        const answer = await client.query(users.getUserByEmail, [email]);

        
        return answer.rows[0];

    } catch (error) {
        return error
    } finally {
        client.release();
    }
}



/**
 * 
 * @param {*} user 
 * @returns 
 */
const getUserFavorites = async (user) => {
    let client;
    const pool = bdConnect();
    try {
        client = await pool.connect();
        
        const answer = await client.query(movies.getUserFavorites, [user]);

        
        return answer.rows;
    } catch (error) {
        return error
    } finally {
        client.release();
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
    let client;
    const pool = bdConnect();
    try {
        client = await pool.connect();
        
        const answer = await client.query(users.createUser, [name_user, email, password_hash, role_id]);

        
        return answer.rows;
    } catch (error) {
        throw error
    } finally {
        client.release();
    }
}





/**
 * 
 * @param {*} name 
 * @param {*} id 
 * @returns 
 */
const updateUser = async (name, id) => {
    let client;
    const pool = bdConnect();
    try {
        client = await pool.connect();
        
        const answer = await client.query(users.updateUser, [name, id]);
 
        
        return answer.rows;
    } catch (error) {
        return error
    } finally {
        client.release();
    }
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const deleteUser = async (id) => {
    let client;
    const pool = bdConnect();
    try {
        client = await pool.connect();
        
        const answer = await client.query(users.deleteUser, [id]);
 
        
        return answer.rows;
    } catch (error) {
        return error
    } finally {
        client.release();
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