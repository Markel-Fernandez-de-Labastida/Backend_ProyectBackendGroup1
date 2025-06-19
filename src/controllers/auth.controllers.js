
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
//importar conexión con bd pool
// LOGIN

/**
 * Función para iniciar la sesión del usuario.
 * @param {*} req 
 * @param {*} res 
 * @returns 
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
        // CREAR TOKEN
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
 * @param {*} req 
 * @param {*} res 
 * @returns Devuelve el objeto con el usuario registrado y el token de la sesión
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
            // redirigir al login
        }
        // encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        let role_id;
        // añadir a la bbdd
        const savedUser = await insertUser(name, email, encryptedPassword, role_id = 2);
        //console.log('SAVED USER', savedUser);

        // DETERMINAR ROL SEGÚN SU ROLE_ID
        let role;
        if (role_id === 1) {
            role = 'admin';
        } else if (role_id === 2) {
            role = 'user';
        }
        // crear token
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
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
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