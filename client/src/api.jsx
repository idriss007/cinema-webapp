import axios from "axios";

export async function fetchMovies(query) {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + process.env.REACT_APP_API_URL + "&query=" + query;

    const { data } = await axios.get(url);

    return data;
};

export async function getImages(id) {
    const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_URL + "&append_to_response=images";

    const { data } = await axios.get(url);
    
    return data;
}

export async function getGenreList() {
    const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.REACT_APP_API_URL;
    
    const { data } = await axios.get(url);

    return data;
}

export async function getDetail(id) {
    const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_URL;
    
    const { data } = await axios.get(url);

    return data;
}

export async function fetchRegister() {
    const url = "http://localhost:4000/register";

    const { data } = await axios.get(url);

    return data;
}