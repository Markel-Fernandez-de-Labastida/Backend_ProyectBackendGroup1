
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
            return res.status(403).json({
                ok: false,
                msg: 'La contraseña no coincide.'
            })
        }
        // CREAR TOKEN
        let token;

        await createToken(user.id, user.role)
            .then((resp) => token = resp)
            .catch((error) => {
                return res.status(403).json({
                    ok: false,
                    msg: error
                })
            })
        return res.status(200).json({
            ok: true, 
            msg: 'Usuario logueado'
        })
        // if (user.rol === 'admin')
        // res.redirect('/admin/movies)
        // if (user.rol === 'user')
        // res.redirect('/dashboard)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador.'
        })
    }
}

// const getUsers = async (req, res) => {
//     try {
//         const users = await getAllUsers()
//         //console.log(users)
//         res.status(200).json({
//             ok: true,
//             msg: 'Entra en getUsers'
//         })
//     } catch (error) {
//         //console.log({error})
//         res.status(500).json({
//             ok: false
//         })
//     }
// }

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

        // añadir a la bbdd
        const savedUser = await insertUser(name, email, encryptedPassword, 1);
        console.log('SAVED USER', savedUser);
        // crear token
        let token;
        await createToken(savedUser.id, savedUser.role)
            .then((resp) => token = resp)
            .catch ((error) => {
                return res.status(403).json({
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

module.exports = {
    loginUser,
    //getUsers,
    signUpUser
}