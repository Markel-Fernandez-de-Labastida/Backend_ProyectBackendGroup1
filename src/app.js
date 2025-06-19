
const express = require('express');

const cors = require('cors');

const authRoutes = require('./routes/auth.routes');


//const {connection} = require('./utils/dbconnect')

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

const whiteList = ['http://localhost:3000', 'http://localhost:5000', 'https://frontend-movie-app-b8in.onrender.com'];
app.use(cors({
    origin: whiteList
}));


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

// Poner la aplicación a la escucha del puerto
app.listen(port, () => {
    console.log(`Server on port ${port}`);
})

