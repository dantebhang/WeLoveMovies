const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const data = await service.list(request.params.movieId);
  response.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
