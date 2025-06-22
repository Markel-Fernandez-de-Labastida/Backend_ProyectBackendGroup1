
const { users, movies } = require("../models/querys");
const { bdConnect } = require("../utils/dbConnect");

/**
 * Función para verificar que el usuario existe en la base de datos.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @param {Number} id id del usuario
 * @returns Devuelve el id del usuario en caso de existir.
 */
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

/**
 * Función para obtener el rol del usuario según su id.
 * @param {Number} id id del usuario
 * @returns Devuelve el rol del usuario.
 */
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
 * Función para obetener las películas favoritas de un usuario de la base de datos.
 * @param {String} user nombre del usuario
 * @returns Devuelve las películas favoritas del usuario.
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

/**
 * Función para obtener todos los usuarios.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @returns Devuelve un array con los datos.
 */
const getAllUsers = async () => {
  let client;
  try {
    const pool = bdConnect();
    const client = await pool.connect();

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
 * Función para obetener un usuario según su email.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @param {String} email email del usuario
 * @returns Devuelve el usuario que coincida con el email.
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
 * Función para insertar un usuario en la base de datos.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @param {String} name_user nombre del usuario
 * @param {String} email email del usuario
 * @param {String} password_hash contraseña hasheada del usuario
 * @param {Number} role_id id del rol del usuario
 * @returns Inserta los datos del usuario.
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
 * Función para editar datos del usuario en la base de datos.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @param {String} name nombre del usuario
 * @param {Number} id id del usuario
 * @returns Actualiza los datos del usuario.
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
 * Función para eliminar un usuario de la base de datos.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @param {Number} id id del usuario
 * @returns Elimina un usuario según su id.
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

/**
 * Función para añadir una película a favoritos.
 * Realiza la conexión a la base de datos, ejecuta una consulta SQL y libera la conexión.
 * @param {Number} id_user id del usuario
 * @param {Number} id_movie id de la película
 * @returns Añade la película a favoritos.
 */
const addFavorite = async (id_user, id_movie) => {
  let client;
  try {
    const pool = bdConnect();
    client = await pool.connect();

    const answer = await client.query(users.addFavoriteMovie, [id_user, id_movie]);

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
