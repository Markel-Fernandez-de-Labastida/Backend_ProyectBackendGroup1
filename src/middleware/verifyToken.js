const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const header = req.header('Authorization');
    if (!header) {
        return res.status(401).json({
            msg: 'No hay informacion de autenticación'
        })
    }
    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            msg: 'Formato de token invalido'
        })
    }
    const token = parts[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({ msg: 'Token no válido' });
            }
            req.user = decoded;
            next();
        })
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "El token no es válido."
        })
    }

}

module.exports = {
    validateJWT
}

