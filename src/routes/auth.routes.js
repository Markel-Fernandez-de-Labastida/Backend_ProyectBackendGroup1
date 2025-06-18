
const {Router} = require('express');
const { loginUser, getUsers, signUpUser } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validateInput } = require('../middleware/validateInput');
const { validateJWT } = require('../middleware/verifyToken');


const router = Router();

router.post('/login', [
    check ('email', 'email requerido').notEmpty().isString(),
    check('password','password requerido').notEmpty().isString(),
    validateInput
], loginUser);

//router.get('/login', getUsers);

router.post('/signup', [
    check('name', 'name es requerido').notEmpty().isString(),
    check('email', 'email es requerido').notEmpty().isString(),
    check('password', 'password es requerido').notEmpty().isString(),
    validateInput
], signUpUser);

module.exports = router;