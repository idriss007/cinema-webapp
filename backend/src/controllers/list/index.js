const List = require("../../models/list");

//Girilen bilgilere göre yeni liste oluşturma veya yeni kayıt olurken her kullanıcıya watchlist isminde
//bir liste oluştruma.
const CreateList = async (req, res) => {
  const data = req.body;

  if (!data) {
    res.Send("No data found.");
  }

  try {
    const newList = await List.create(data);

    res.send({ newList });
  } catch (err) {
    res.send(err);
  }
};

const GetList = async (req, res) => {
  const { list_id } = req.params;
  try {
    const list = await List.findById(list_id);
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

//Kullanıcının sahip olduğu tüm listeleri döndürür.
const GetLists = async (req, res) => {
  const { user_id } = req.params;

  try {
    const lists = await List.find({ user: user_id });
    // console.log(lists);
    // console.log(lists[0].user._id.toString());
    // const filteredLists = lists.find(list => list.user._id.toString() === user_id);
    // res.send([filteredLists]);
    res.send(lists);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

//Belirtilen id 'deki listeye belirtilen id'deki filmi ekleme.
const AddToList = async (req, res) => {
  const { list_id } = req.params;
  const { movieData } = req.body;

  if (!list_id || !movieData) {
    return res.sendStatus(400);
  }

  try {
    const list = await List.findById(list_id);

    // let isContain = null;

    // if (list.movies.length > 0) {
    //     list.movies.map(movie => {
    //         if (movie.movie.id === movieData.id) { isContain = true } else { isContain = false };
    //     });
    // }

    const isContain = list.movies.find(
      (movie) => movie.movie.id === movieData.id
    );

    //Eklenilen dizi veritabanında listeye kayıtlıysa hata gönder. Değilse Veritabandaki listeye kayıt edilecek.
    if (isContain) {
      // return res.send("Movie already in this list.")
      return res.send("Movie already in the list");
    }

    list.movies.push({ movie: movieData });
    const updatedList = await list.save();
    res.send(updatedList);
  } catch (err) {
    res.send(err);
  }
};

const RemoveFromList = async (req, res) => {
  const { list_id } = req.params;
  const { movieData } = req.body;

  if (!list_id || !movieData) {
    return res.send(400);
  }

  try {
    const list = await List.findById(list_id);

    // let isContain = null;

    // if (list.movies.length > 0) {
    //     list.movies.map(movie => {
    //         if (movie.movie.id === movieData.id) { isContain = true } else { isContain = false };
    //     });
    // }

    const isContain = list.movies.find(
      (movie) => movie.movie.id === movieData.id
    );

    //Eklenilen dizi veritabanında listeye kayıtlı değilse hata gönder. Kayıtlıysa veritabanındaki listeden silinsin.
    if (!isContain) {
      // return res.send("Movie already in this list.")
      return res.sendStatus(400);
    }

    const filteredlist = list.movies.filter(
      (movie) => movie.movie.id !== movieData.id
    );

    list.movies = filteredlist;
    const updatedList = await list.save();
    return res.send(updatedList);
  } catch (err) {
    res.send(err);
  }
};

const DeleteList = async (req, res) => {
  const { list_id } = req.body;

  try {
    await List.findByIdAndDelete(list_id);
    res.send("Deleted the list.");
  } catch (err) {
    console.log(err);
  }
};

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
