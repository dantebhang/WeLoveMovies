const router = require("express").Router({mergeParams: true});
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.listMoviesShowing).all(methodNotAllowed);

module.exports = router;