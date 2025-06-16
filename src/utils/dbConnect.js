const { Pool } = require('pg');
require('dotenv').config();

const bdConnect = () => {
    try {
        const pool = new Pool({
        host: process.env.POOL_HOST,
        user: process.env.POOL_USER,
        database: process.env.POOL_DATABASE,
        password: process.env.POOL_PASSWORD
        });

        return pool;
    } catch (error) {
        throw 'Error. Contacte con el administrador'
    }

}

module.exports = {
    bdConnect
};