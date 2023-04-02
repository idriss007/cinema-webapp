const Rating = require("../../models/rating");

const CreateRatingList = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.sendStatus(400);
  }

  try {
    const newList = await Rating.create({ user_id });
    res.send(newList);
  } catch (err) {
    console.log(err.message);
    res.sendSatus(404);
  }
};

const AddRating = async (req, res) => {
  const { user_id, movie_id, ratingValue } = req.body;

  if (!user_id || !movie_id || !ratingValue) {
    return res.sendStatus(400);
  }

  // await rating.create({ user: user_id, list: list_id});

  try {
    const ratingList = await Rating.findOne({ user_id: user_id });

    const foundRating = await ratingList.rating.find(
      (pair) => pair.movie_id === JSON.stringify(movie_id)
    );

    // ratingList.rating.push({movie_id: movie_id, ratingValue: ratingValue});
    // const savedList = await ratingList.save();
    // res.send(savedList);

    // const foundRating = ratingList.rating.find(pair => console.log(pair.movie_id))

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
  } catch (err) {
    console.log(err.message);
    res.sendStatus(400);
  }
};

const DeleteRating = async (req, res) => {
  const { user_id, movie_id } = req.body;
  if (!user_id || !movie_id) {
    return res.sendStatus(400);
  }

  try {
    const ratingList = await Rating.findOne({ user_id: user_id });

    // console.log(ratingList.foundRating);

    const filteredList = ratingList.rating.filter(
      (pair) => pair.movie_id !== JSON.stringify(movie_id)
    );

    ratingList.rating = filteredList;
    const savedList = await ratingList.save();
    res.send(savedList);
  } catch (err) {
    console.log(err.message);
    res.sendSatus(400);
  }
};

const GetRating = async (req, res) => {
  const { user_id, movie_id } = req.params;

  if (!user_id || !movie_id) {
    res.sendSatus(400);
  }

  try {
    const ratingList = await Rating.findOne({ user_id: user_id });
    const rating = ratingList.rating.find(
      (rating) => rating.movie_id === movie_id
    );
    res.send(rating?.ratingValue);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = { CreateRatingList, AddRating, DeleteRating, GetRating };
