const ListNotFoundError = require("../../../errors/ListNotFoundError");
const BadRequestError = require("../../../errors/BadRequestError");
const UnAuthenticatedError = require("../../../errors/UnAuthenticatedError");

const List = require("../../models/list");
const { tryCatch } = require("../../utils/tryCatch");
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

  const list = await List.findById(list_id);
  res.send(list);
});

//Kullanıcının sahip olduğu tüm listeleri döndürür.
const GetLists = tryCatch(async (req, res) => {
  const { user_id } = req.params;

  const lists = await List.find({ user: user_id });
  res.send(lists);
});

//Belirtilen id 'deki listeye belirtilen id'deki filmi ekleme.
const AddToList = tryCatch(async (req, res) => {
  const { list_id } = req.params;
  const { movieData } = req.body;

  if (!list_id || !movieData) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const list = await List.findById(list_id);

  if (list.user.toString() !== req.payload.user_id) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  const isContain = list.movies.find(
    (movie) => movie.movie.id === movieData.id
  );

  //Eklenilen dizi veritabanında listeye kayıtlıysa hata gönder. Değilse Veritabandaki listeye kayıt edilecek.
  if (!isContain) {
    list.movies.push({ movie: movieData });
    const updatedList = await list.save();
    res.send(updatedList);
  }
});

const RemoveFromList = tryCatch(async (req, res) => {
  const { list_id } = req.params;
  const { movieData } = req.body;

  if (!list_id || !movieData) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const list = await List.findById(list_id);

  if (list.user.toString() !== req.payload.user_id) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  const isContain = list.movies.find(
    (movie) => movie.movie.id === movieData.id
  );

  //Eklenilen dizi veritabanında listeye kayıtlı değilse hata gönder. Kayıtlıysa veritabanındaki listeden silinsin.
  if (!isContain) {
    throw new BadRequestError("Movie is not in the list.");
  }

  const filteredlist = list.movies.filter(
    (movie) => movie.movie.id !== movieData.id
  );

  list.movies = filteredlist;
  const updatedList = await list.save();
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

//Var olan listeye film ekleme

//Var olan listeden film silme

//Liste silme

//

module.exports = {
  CreateList,
  GetList,
  GetLists,
  AddToList,
  RemoveFromList,
  DeleteList,
};
