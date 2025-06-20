
const { users, movies } = require("../models/querys");
const { bdConnect } = require("../utils/dbConnect");

const checkUsrExists = async (id) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(users.checkUserExists, [id]);

    return answer.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const getUserRol = async (id) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(users.getUserRole, [id]);

    return answer.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};


/**
 *
 * @param {*} user
 * @returns
 */
const getAllFavorites = async (user) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(movies.getUserFavorites, [user]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const getAllUsers = async () => {
  let client;
  try {
    const pool = bdConnect();
    const client = await pool.connect();
    //console.log("client:", client);
    const answer = await client.query(users.getAllUsers);

    return answer.rows;
  } catch (error) {
    console.log("error modelo", error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 *
 * @param {*} email
 * @returns
 */
const getUserByEmail = async (email) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(users.getUserByEmail, [email]);

    return answer.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

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
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(users.createUser, [
      name_user,
      email,
      password_hash,
      role_id,
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
 * @param {*} name
 * @param {*} id
 * @returns
 */

const updtUser = async (name, id) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(users.updateUser, [name, id]);

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

const delUser = async (id) => {
  let client;
  try {
    const pool = bdConnect();
    const client = await pool.connect();

    const answer = await client.query(users.deleteUser, [id]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const addFavorite = async (id_user, id_movie) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(users.addFavorite, [id_user, id_movie]);

    return answer.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  checkUsrExists,
  getUserRol,
  getAllUsers,
  getAllFavorites,
  getUserByEmail,
  addFavorite,
  insertUser,
  updtUser,
  delUser,
};
