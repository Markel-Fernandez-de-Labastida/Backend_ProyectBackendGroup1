
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


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        console.log('USUARIO:', user);
        if (!user) {
            return res.status(403).json({
                ok: false,
                msg: 'El usuario no existe.'
            })
        }
        console.log('PASSWORD:', {password}, 'HASH_PASSWORD:', user.password_hash)
        const verifyPassword = bcrypt.compareSync(password, user.password_hash);
        console.log(verifyPassword)
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

const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers()
        //console.log(users)
        res.status(200).json({
            ok: true,
            msg: 'Entra en getUsers'
        })
    } catch (error) {
        //console.log({error})
        res.status(500).json({
            ok: false
        })
    }
}

module.exports = {
    loginUser,
    getUsers
}