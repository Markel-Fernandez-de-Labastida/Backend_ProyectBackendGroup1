
const {Router} = require('express');
const { loginUser } = require('../controllers/auth.controllers');
const { check } = require('express-validator');


const router = Router();

router.post('/login', [
    check ('email', 'email requerido').notEmpty().isString(),
    check('password','password requerido').notEmpty().isString(),
    validateInput
], loginUser);

module.exports = router;