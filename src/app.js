const express = require("express");

const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const movieRoutes = require("./routes/movies.routes");
//console.log("Fin de requerimientos");

require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

const whiteList = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://frontend-movie-app-b8in.onrender.com",
  "https://frontend-proyectbackendgroup1.onrender.com",
];
app.use(
  cors({
    origin: whiteList,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/file", express.static(__dirname + "/public/uploads")); // Servir archivos

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);

// Poner la aplicación a la escucha del puerto
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
