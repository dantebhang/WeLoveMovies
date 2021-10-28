const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCriticDetails = mapProperties({
	critic_id: "critic.critic_id",
	preferred_name: "critic.preferred_name",
	surname: "critic.surname",
	organization_name: "critic.organization_name",
	created_at: "critic.created_at",
	updated_at: "critic.updated_at",
});

function list() {
	return knex("movies").select("*");
}

function listIsShowing() {
	return knex("movies as m")
		.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
		.select()
		.where({ "mt.is_showing": true })
		//.groupBy("mt.movie_id");
}

function read(movieId) {
	return knex("movies").select().where({ movie_id: movieId }).first();
}

function readTheaters(movieId) {
	return knex("movies as m")
		.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
		.join("theaters as t", "t.theater_id", "mt.theater_id")
		.select("t.*", "mt.is_showing", "m.movie_id")
		.where({ "m.movie_id": movieId })
		.andWhere({ "mt.is_showing": true });
}

function listReviews(movieId) {
	return knex("movies as m")
		.join("reviews as r", "r.movie_id", "m.movie_id")
		.join("critics as c", "c.critic_id", "r.critic_id")
		.select("*")
		.where({ "r.movie_id": movieId })
		.then((reviews) => {
			const reviewsWithCriticDetails = [];
			reviews.forEach((review) => {
				const addedCritic = addCriticDetails(review);
				reviewsWithCriticDetails.push(addedCritic);
			});
			return reviewsWithCriticDetails;
		});
}

module.exports = {
	list,
	listIsShowing,
	read,
	readTheaters,
	listReviews,
};
