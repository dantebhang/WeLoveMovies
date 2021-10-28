const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next){
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie){
        res.locals.movie = movie;
        return next();
    }
    return next({ 
        status: 404, 
        message: `Movie cannot be found.`
    })
}

async function list(req, res) {
	if (req.query.is_showing === "true") {
		const data = await service.listIsShowing();
		res.json({ data });
	} else {
        const data = await service.list()
        res.json({ data })
    }
}

function read(req, res, next){
    const { movie } = res.locals;
    res.json({ data: movie });
}

async function readTheaters(req, res, next){
    const { movie } = res.locals;
    const data = await service.readTheaters(movie.movie_id);
    res.json({ data })
}

async function listReviews(req, res){
    const data = await service.listReviews(res.locals.movie.movie_id)
    res.json({ data })
}

module.exports = {
	list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
};
