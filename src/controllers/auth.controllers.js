
const bcrypt = require('bcryptjs');
const {
    getAllUsers,
    getUserByEmail,
    getUserFavorites,
    insertUser,
    updateUser,
    deleteUser
} = require('../models/users.models');

const { createToken } = require('../utils/createToken');

// LOGIN

/**
 * Función para iniciar la sesión del usuario.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Si el usuario existe, comprueba que la contraseña coincide y devuelve un token para la sesión.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(403).json({
                ok: false,
                msg: 'El usuario no existe.'
            })
        }
        const verifyPassword = bcrypt.compareSync(password, user.password_hash);
        if (!verifyPassword) {
            return res.status(401).json({
                ok: false,
                msg: 'Credenciales incorrectas.'
            })
        }
        let role;
        if (user.role_id === 1) {
            role = 'admin';
        } else if (user.role_id === 2) {
            role = 'user';
        }
        let token;
        await createToken(user.id, role)
            .then((resp) => token = resp)
            .catch((error) => {
                console.log(error)
                return res.status(401).json({
                    ok: false,
                    msg: error
                })
            })
        return res.status(200).json({
            ok: true,
            msg: 'Usuario logueado',
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador.'
        })
    }
}

/**
 * Función para registrar al usuario.
 * @param {Object} req Requerimiento. Datos de la solicitud.
 * @param {Object} res Respuesta
 * @returns Si el usuario no existe, lo guarda y devuelve un objeto con el usuario registrado y el token de la sesión.
 */
const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (user) {
            return res.status(403).json({
                ok: false,
                msg: 'El usuario ya existe.'
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        let role_id;
        const savedUser = await insertUser(name, email, encryptedPassword, role_id = 2);
        let role;
        if (role_id === 2) {
            role = 'user';
        }
        let token;
        await createToken(savedUser[0].id_user, role)
            .then((resp) => token = resp)
            .catch((error) => {
                return res.status(401).json({
                    ok: false,
                    msg: error
                })
            });
        return res.status(200).json({
            ok: true,
            savedUser,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacte con el administrador."
        })
    }

}

/**
 * Función para renovar el token en cada entrada a una ruta protegida
 * @param {Object} req Requerimiento
 * @param {Object} res Respuesta
 * @returns Devuelve un nuevo token.
 */

const renewToken = async (req, res) => {
    const uid = req.uid;
    const role = req.role;

    let newToken;
    await createToken(uid, role)
        .then((resp) => newToken = resp)
        .catch((error) => {
            return res.status(401).json({
                ok: false,
                msg: error
            })
        });
    return res.status(201).json({
        ok: true,
        newToken
    })
}



module.exports = {
    loginUser,
    signUpUser,
    renewToken
}