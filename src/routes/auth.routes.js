
const {Router} = require('express');
const { loginUser, getUsers } = require('../controllers/auth.controllers');
const { getAllUsers } = require('../models/users.models')
const { check } = require('express-validator');
const { validateInput} = require('../middleware/validateInput');


const router = Router();

router.post('/login', [
    check ('email', 'email requerido').notEmpty().isString(),
    check('password','password requerido').notEmpty().isString(),
    validateInput
], loginUser);

router.get('/login', getUsers);

module.exports = router;