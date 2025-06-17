
//const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/createToken');

//importar conexión con bd pool
// LOGIN


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // await
        const user = getUsersByEmail([email]);
        if (!user.rows[0]) {
            return res.status(403).json({
                ok: false,
                msg: 'El usuario no existe.'
            })
        }
        const verifyPassword = bcrypt.compareSync(password, user.rows[0].password);
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

        // if (user.rol === 'admin')
        // res.redirect('/admin/movies)
        // if (user.rol === 'user')
        // res.redirect('/dashboard)
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con el administrador.'
        })
    }
}

module.exports = {
    loginUser
}