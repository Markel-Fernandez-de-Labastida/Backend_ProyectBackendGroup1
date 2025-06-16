const express = require('express');
require('dotenv').config();
const {bdConnect} = require('./utils/dbConnect');
const {getUserByEmail} = require('./models/users.models');

bdConnect()
    .catch()

const res = async () => {
    const resul = await getUserByEmail('victor@gmail.com');
    console.log(resul);
}

res();