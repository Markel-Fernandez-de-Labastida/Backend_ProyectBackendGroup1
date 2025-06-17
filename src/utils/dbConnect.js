const { Pool } = require('pg');
require('dotenv').config();

const bdConnect = () => {
    console.log(process.env.POOL_HOST, process.env.POOL_USER, process.env.POOL_DATABASE, process.env.POOL_PASSWORD)
    try {
        const pool = new Pool({
        host: process.env.POOL_HOST,
        user: process.env.POOL_USER,
        database: process.env.POOL_DATABASE,
        password: process.env.POOL_PASSWORD,
        port: process.env.POOL_PORT
        });
        console.log('Conectado a BD');
        //console.log({pool})
        return pool;
    } catch (error) {
        console.log(error)
        throw 'Error. Contacte con el administrador'
    }

}

module.exports = {
    bdConnect
};