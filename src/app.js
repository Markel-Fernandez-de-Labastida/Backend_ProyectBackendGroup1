
const express = require('express');


const cors = require('cors');

/* const publicRoutes = require('./routes/public.routes');
const adminRoutes = require('./routes/admin.routes')*/
const authRoutes = require('./routes/auth.routes');


//const {connection} = require('./utils/dbconnect')

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

const whiteList = ['http://localhost:3000', 'http://xxxx-front.render.com'];
app.use(cors({
    origin: whiteList
}));


app.use(express.urlencoded());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1', publicRoutes);

// app.use('/api/v1/admin', adminRoutes);

// Poner la aplicación a la escucha del puerto
app.listen(port, () => {
    console.log(`Server on port ${port}`);
})

