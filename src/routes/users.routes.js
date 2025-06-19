const { Router } = require("express");
const {
  addFavourite,
  getUserRole,
  getUserFavorites,
} = require("../controllers/users.controllers");

const routes = Router();

routes.post("/addFavorite", addFavourite);
routes.get("/getRole", getUserRole);
routes.get("/movies", getUserFavorites);

module.exports = routes;
