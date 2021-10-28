const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theaterRouter = require("../theaters/theaters.router");
const reviewRouter = require("../reviews/reviews.router")

router.route("/").get(controller.list).all(methodNotAllowed);

router
	.route("/:movieId/theaters", theaterRouter)
	.get(controller.readTheaters)
	.all(methodNotAllowed);

router
	.route("/:movieId/reviews", reviewRouter)
	.get(controller.listReviews)
	.all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;
