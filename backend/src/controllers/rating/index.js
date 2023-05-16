//Models
const Rating = require("../../models/rating");
const List = require("../../models/list");

//Utils
const { tryCatch } = require("../../utils/tryCatch");

//Errors
const BadRequestError = require("../../errors/BadRequestError");

const CreateRatingList = tryCatch(async (req, res) => {
  const newList = await Rating.create({ user_id: req.payload.user_id });
  res.send(newList);
});

const AddRating = tryCatch(async (req, res) => {
  const { movie_id, ratingValue } = req.body;

  if (!movie_id || !ratingValue) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const ratingList = await Rating.findOne({ user_id: req.payload.user_id });

  const foundRating = await ratingList.rating.find(
    (pair) => pair.movie_id === JSON.stringify(movie_id)
  );

  //watchedlisti al ve puanlanan film watchedlistte yer alıyorsa watchedlistten sil.
  const watchedlist = (await List.find({ user: req.payload.user_id }))?.[2];
  const isContain = watchedlist.movies.find(
    (movie) => movie.movie.id === movie_id
  );
  if (isContain) {
    const filteredlist = watchedlist.movies.filter(
      (movie) => movie.movie.id !== movie_id
    );
    watchedlist.movies = filteredlist;
    await watchedlist.save();
  }

  if (!foundRating) {
    // const newRating = await rating.create({ user: user_id, list: list_id, movie_id, ratingValue });
    ratingList.rating.push({ movie_id: movie_id, ratingValue: ratingValue });
    const savedList = await ratingList.save();
    res.send(savedList);
  }

  if (foundRating) {
    foundRating.ratingValue = ratingValue;
    const updatedList = await ratingList.save();
    res.send(updatedList);
  }
});

const DeleteRating = tryCatch(async (req, res) => {
  const { movie_id } = req.body;
  if (!movie_id) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const ratingList = await Rating.findOne({ user_id: req.payload.user_id });

  const filteredList = ratingList.rating.filter(
    (pair) => pair.movie_id !== JSON.stringify(movie_id)
  );

  ratingList.rating = filteredList;
  const savedList = await ratingList.save();
  res.send(savedList);
});

const GetRating = tryCatch(async (req, res) => {
  const { user_id, movie_id } = req.params;

  if (!user_id || !movie_id) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const ratingList = await Rating.findOne({ user_id: user_id });
  const rating = ratingList.rating.find(
    (rating) => rating.movie_id === movie_id
  );
  res.send(rating?.ratingValue);
});

module.exports = { CreateRatingList, AddRating, DeleteRating, GetRating };
