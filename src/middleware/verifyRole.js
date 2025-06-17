

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        // Asumiendo que el middleware validateJWT ya puso el usuario en req.user
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                message: 'Información de usuario no disponible'
            });
        }

        console.log('Rol del usuario:', req.user.role);
        
        if (req.user.role !== requiredRole) {
            return res.status(403).json({
                message: 'Acceso no autorizado para este rol'
            });
        }
        next(); // Continuar si el rol es correcto
    };
};

module.exports = {
    verifyRole
};