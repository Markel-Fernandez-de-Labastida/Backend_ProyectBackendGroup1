const { Router } = require("express");
const { addFavourite } = require("../controllers/users.controllers");

const routes = Router();

routes.post("/addFavorite", addFavourite);

module.exports = routes;
