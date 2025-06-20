const{validationResult} = require('express-validator')
const validateInput = (req, res, next) => {

    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        console.log(errores)
        return res.status(400).json({
            ok: false,
            msg: 'Error en los campos del formulario.',
            errores: errores.mapped()
        })
    }
    next()
}

module.exports = {
    validateInput
}

