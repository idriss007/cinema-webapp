const List = require("../../models/list");

//Girilen bilgilere göre yeni liste oluşturma veya yeni kayıt olurken her kullanıcıya watchlist isminde
//bir liste oluştruma.
const CreateList = async (req, res) => {

    const data = req.body;

    if (!data) { res.Send("No data found.") };

    try {

        const newList = await List.create(data);
        console.log(newList);
        res.send({ newList })

    } catch (err) {
        res.send(err);
    }

}

//Kullanıcının sahip olduğu tüm listeleri döndürür.
const GetLists = async (req, res) => {

    const { user_id } = req.params;

    try {
        const lists = await List.find({ user: user_id });
        // console.log(lists);
        // console.log(lists[0].user._id.toString());
        // const filteredLists = lists.find(list => list.user._id.toString() === user_id);
        // res.send([filteredLists]);
        res.send(lists)
    } catch (err) {
        console.log(err);
        res.send(err);
    }

}

//Belirtilen id 'deki listeye belirtilen id'deki filmi ekleme.
const AddToList = async (req, res) => {

    const { list_id } = req.params;
    const { movie_id } = req.params;

    if (!list_id || !movie_id) { return res.send(400); }

    try {
        const list = await List.findById(list_id);

        const isContain = list.movieIds.find(Id => Id === movie_id);
        if (isContain) {
            // return res.send("Movie already in this list.")
            return res.sendStatus(400);
        }

        list.movieIds.push(movie_id);
        const updatedList = await list.save();
        res.send(updatedList);
    } catch (err) {
        res.send(err);
    }

}

const RemoveFromList = async (req, res) => {

    const { list_id } = req.params;
    const { movie_id } = req.params;

    if (!list_id || !movie_id) { return res.send(400); }

    try {
        const list = await List.findById(list_id);

        const isContain = list.movieIds.find(Id => Id === movie_id);

        if (!isContain) {
            // return res.send("Movie already in this list.")
            return res.sendStatus(400);
        }

        const filteredlist = list.movieIds.filter(id => id !== isContain);
        
        list.movieIds = filteredlist;
        const updatedList = await list.save();
        return res.send(updatedList)
    } catch (err) {
        res.send(err);
    }

}

//Var olan listeye film ekleme

//Var olan listeden film silme

//Liste silme

//

module.exports = { CreateList, GetLists, AddToList, RemoveFromList }