const { users, movies } = require("../models/querys");
const { bdConnect } = require("../utils/dbConnect");
const pool = bdConnect();

const getAllUsers = async () => {
  try {
    const client = await pool.connect();
    //console.log("client:", client);
    const answer = await client.query(users.getAllUsers);
    //console.log(answer);
    client.release();
    return answer.rows;
  } catch (error) {
    console.log("error modelo", error);
    throw error;
  }
};

/**
 *
 * @param {*} email
 * @returns
 */
const getUserByEmail = async (email) => {
  try {
    const client = await pool.connect();

    const answer = await client.query(users.getUserByEmail, [email]);
    console.log(answer);

    console.log(answer);
    client.release();
    return answer.rows[0];
  } catch (error) {
    return error;
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
  try {
    const client = await pool.connect();

    const answer = await client.query(users.createUser, [
      name_user,
      email,
      password_hash,
      role_id,
    ]);
    console.log(answer);

    console.log(answer);
    client.release();
    return answer.rows;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} name
 * @param {*} id
 * @returns
 */
const updtUser = async (name, id) => {
  try {
    const client = await pool.connect();

    const answer = await client.query(users.updateUser, [name, id]);
    console.log(answer);

    console.log(answer);
    client.release();
    return answer.rows;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {*} id
 * @returns
 */
const delUser = async (id) => {
  try {
    const client = await pool.connect();

    const answer = await client.query(users.deleteUser, [id]);
    console.log(answer);

    console.log(answer);
    client.release();
    return answer.rows;
  } catch (error) {
    return error;
  }
};

const addFavorite = async (id_user, id_movie) => {
  try {
    const client = await pool.connect();

    const answer = await client.query(users.addFavorite, [id_user, id_movie]);
    console.log(answer);

    client.release();
    return answer.rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  addFavorite,
  insertUser,
  updtUser,
  delUser,
};
