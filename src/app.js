const express = require("express");

const cors = require("cors");

/* const publicRoutes = require('./routes/public.routes');
const adminRoutes = require('./routes/admin.routes')*/
const userRoutes = require("./routes/users.routes");
const movieRoutes = require("./routes/movies.routes");
console.log("Fin de requerimientos");

require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

const whiteList = ["http://localhost:3000", "http://xxxx-front.render.com"];
app.use(
  cors({
    origin: whiteList,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/file", express.static(__dirname + "/public/uploads")); // Servir archivos

//app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);
// app.use('/api/v1', publicRoutes);

// app.use('/api/v1/admin', adminRoutes);

// Poner la aplicación a la escucha del puerto
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
