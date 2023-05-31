//Errors
const ListNotFoundError = require("../../errors/ListNotFoundError");
const BadRequestError = require("../../errors/BadRequestError");
const UnAuthenticatedError = require("../../errors/UnAuthenticatedError");

const ErrorMessage = require("../../utils/constants");

//Models
const List = require("../../models/list");
const Rating = require("../../models/rating");

//Utils
const { tryCatch } = require("../../utils/tryCatch");

//Validations
const { validateList } = require("./validations");

//Girilen bilgilere göre yeni liste oluşturma veya yeni kayıt olurken her kullanıcıya watchlist isminde
//bir liste oluştruma.
const CreateList = tryCatch(async (req, res) => {
  const { error, value } = validateList(req.body);

  if (error) {
    throw error;
  }

  const newList = await List.create({
    name: value.name,
    user: req.payload.user_id,
  });

  res.send({ newList });
});

const GetList = tryCatch(async (req, res) => {
  const { list_id } = req.params;

  const list = await List.findById(list_id).populate("user");
  res.send(list);
});

//Kullanıcının sahip olduğu tüm listeleri döndürür.
const GetLists = tryCatch(async (req, res) => {
  const { user_id } = req.params;

  const lists = await List.find({ user: user_id }).populate("user");
  res.send(lists);
});

//Belirtilen id 'deki listeye belirtilen id'deki filmi ekleme.
const AddToList = tryCatch(async (req, res) => {
  const { list_id } = req.params;
  const { movieData } = req.body;

  if (!list_id || !movieData) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const list = await List.findById(list_id);

  if (list.user.toString() !== req.payload.user_id) {
    throw new UnAuthenticatedError(ErrorMessage.UNAUTHENTICATED);
  }

  const allLists = await List.find({ user: req.payload.user_id });

  //Film watchliste mi eklendi kontrolü
  const isAddingToWatchlist = allLists[0].id.toString() === list_id;

  //Film watchedliste mi eklendi kontrolü
  const isAddingToWatchedlist = allLists[2].id.toString() === list_id;

  const isContain = list.movies.find(
    (movie) => movie.movie.id === movieData.id
  );

  //Eklenilen dizi veritabanında listeye kayıtlıysa hata gönder. Değilse Veritabandaki listeye kayıt edilecek.
  if (!isContain) {
    list.movies.push({ movie: movieData });
    const updatedList = await list.save();

    //Film watchtedliste ekleniyorsa watchlistten çıkar
    if (isAddingToWatchedlist) {
      const watchlist = allLists[0];
      const ratingsList = allLists[1];
      const filteredRatingsList = ratingsList.movies.filter(
        (movie) => movie.movie.id !== movieData.id
      );
      const filteredWatchlist = watchlist.movies.filter(
        (movie) => movie.movie.id !== movieData.id
      );
      watchlist.movies = filteredWatchlist;
      await watchlist.save();
      ratingsList.movies = filteredRatingsList;
      await ratingsList.save();

      const ratingValuesList = await Rating.findOne({
        user_id: req.payload.user_id,
      });
      // console.log(ratingList.rating);
      const filteredRatingValuesList = ratingValuesList.rating.filter(
        (pair) => pair.movie_id !== JSON.stringify(movieData.id)
      );

      ratingValuesList.rating = filteredRatingValuesList;
      await ratingValuesList.save();
    }

    //Film watchtliste ekleniyorsa watchedlistten çıkar
    if (isAddingToWatchlist) {
      const watchedlist = allLists[2];
      const filteredlist = watchedlist.movies.filter(
        (movie) => movie.movie.id !== movieData.id
      );
      watchedlist.movies = filteredlist;
      await watchedlist.save();
    }

    res.send(updatedList);
  }
});

const RemoveFromList = tryCatch(async (req, res) => {
  const { list_id } = req.params;
  const { movieData } = req.body;

  if (!list_id || !movieData) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const list = await List.findById(list_id);

  if (list.user.toString() !== req.payload.user_id) {
    throw new UnAuthenticatedError(ErrorMessage.UNAUTHENTICATED);
  }

  const isContain = list.movies.find(
    (movie) => movie.movie.id === movieData.id
  );

  //Eklenilen dizi veritabanında listeye kayıtlı değilse hata gönder. Kayıtlıysa veritabanındaki listeden silinsin.
  if (!isContain) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const filteredlist = list.movies.filter(
    (movie) => movie.movie.id !== movieData.id
  );

  const updatedList = await List.findByIdAndUpdate(
    list_id,
    { $set: { movies: filteredlist } },
    { new: true }
  );

  // list.movies = filteredlist;
  // const updatedList = await list.save();
  return res.send(updatedList);
});

const DeleteList = tryCatch(async (req, res) => {
  const { list_id } = req.body;

  const foundList = await List.findById(list_id);

  if (foundList.user.toString() !== req.payload.user_id) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  const deletedList = await List.findByIdAndDelete(list_id);
  if (!deletedList) {
    throw new ListNotFoundError("List not found.");
  }
  res.send("Deleted the list.");
});

const SetRatingsPrivacy = tryCatch(async (req, res) => {
  const { listId } = req.body;

  if (!listId) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const foundList = await List.findById(listId);
  foundList.isPrivate = !foundList.isPrivate;
  const updatedList = await foundList.save();
  res.send(updatedList);
});

module.exports = {
  CreateList,
  GetList,
  GetLists,
  AddToList,
  RemoveFromList,
  DeleteList,
  SetRatingsPrivacy,
};
