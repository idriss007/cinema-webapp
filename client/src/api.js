import axios, { all } from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access-token");
  config.headers.Authorization = token;
  return config;
});

export async function fetchMovies(query, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    process.env.REACT_APP_API_URL +
    "&query=" +
    query +
    (page ? "&page=" + page : "");

  const { data } = await axios.get(url);

  return data;
}

export async function fetchNowPlayingOrUpcomingMovies(query) {
  const url =
    "https://api.themoviedb.org/3/movie/" +
    query +
    "api_key=" +
    process.env.REACT_APP_API_URL +
    "&region=US";

  const { data } = await axios.get(url);

  return data;
}

export async function getRecommendationsForMovie(movie_id) {
  const url =
    "https://api.themoviedb.org/3/movie/" +
    movie_id +
    "/recommendations?api_key=" +
    process.env.REACT_APP_API_URL;

  const { data } = await axios.get(url);

  return data;
}

export async function getImages(id) {
  const url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=" +
    process.env.REACT_APP_API_URL +
    "&append_to_response=images";

  const { data } = await axios.get(url);

  return data;
}

export async function getGenreList() {
  const url =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    process.env.REACT_APP_API_URL;

  const { data } = await axios.get(url);

  return data;
}

export async function getDetail(id) {
  const url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=" +
    process.env.REACT_APP_API_URL;

  const { data } = await axios.get(url);

  return data;
}

export async function getCredits(movie_id) {
  const url =
    "https://api.themoviedb.org/3/movie/" +
    movie_id +
    "/credits?api_key=" +
    process.env.REACT_APP_API_URL;

  const { data } = await axios.get(url);

  return data;
}

export async function getMoviesByGenre(genre_id) {
  const url =
    "https://api.themoviedb.org/3/discover/movie?" +
    process.env.REACT_APP_API_URL +
    "&sort_by=vote_count.desc&with_genres=" +
    genre_id;

  const { data } = await axios.get(url);

  return data;
}

export async function getPersonDetail(name_id) {
  const url =
    "https://api.themoviedb.org/3/person/" +
    name_id +
    "?api_key=" +
    process.env.REACT_APP_API_URL;

  const { data } = await axios.get(url);

  return data;
}

export async function getPersonCredit(name_id) {
  const url =
    "https://api.themoviedb.org/3/person/" +
    name_id +
    "/combined_credits?api_key=" +
    process.env.REACT_APP_API_URL;

  const { data } = await axios.get(url);

  return data;
}

//USER İŞLEMLERİ

export async function fetchRegister(values) {
  const url = "http://localhost:4000/auth/register";

  const { data } = await axios.post(url, values);

  return data;
}

export async function fetchLogin(values) {
  const url = "http://localhost:4000/auth/login";

  const { data } = await axios.post(url, values);

  return data;
}

export async function fetchMe() {
  const url = "http://localhost:4000/auth/me";

  const { data } = await axios.get(url);

  return data;
}

export async function fetchAccessTokenByRefreshToken() {
  const url = "http://localhost:4000/auth/refresh_token";

  const { data } = await axios.post(url, {
    refresh_token: localStorage.getItem("refresh-token"),
  });

  return data;
}

export async function fetchLogout() {
  const url = "http://localhost:4000/auth/logout";

  const { data } = await axios.post(url, {
    refresh_token: localStorage.getItem("refresh-token"),
  });

  return data;
}

export async function postList(input) {
  const url = "http://localhost:4000/list";

  const { data } = await axios.post(url, input);

  return data;
}

export async function fetchLists(user_id) {
  const url = "http://localhost:4000/list/" + user_id;

  const { data } = await axios.get(url);

  return data;
}

export async function AddToList(list_id, movieData) {
  const movie_id = movieData.id;

  const url = "http://localhost:4000/list/add/" + list_id + "/" + movie_id;

  const { data } = await axios.post(url, { movieData });

  return data;
}

export async function RemoveFromList(list_id, movieData) {
  const movie_id = movieData.id;

  const url = "http://localhost:4000/list/delete/" + list_id + "/" + movie_id;

  const { data } = await axios.post(url, { movieData });

  return data;
}

//RatingList Methods

export async function createRatingList(input) {
  const url = "http://localhost:4000/rating";

  const { data } = await axios.post(url, input);

  return data;
}

export async function addRating(input) {
  const url = "http://localhost:4000/rating/add";

  const { data } = await axios.post(url, input);

  return data;
}

export async function DeleteRating(input) {
  const url = "http://localhost:4000/rating/delete";

  const { data } = await axios.post(url, input);

  return data;
}

export async function GetRating({ user_id, movie_id }) {
  const url = "http://localhost:4000/rating/" + user_id + "/" + movie_id;

  const { data } = await axios.get(url);

  return data;
}

//Comment İşlemleri

export async function FetchAllComments(movie_id, user_id) {
  if (movie_id) {
    const url = "http://localhost:4000/comment/" + movie_id;

    const { data } = await axios.get(url);

    return data;
  } else {
    const url = "http://localhost:4000/comment/" + user_id;

    const { data } = await axios.get(url);

    return data;
  }
}

export async function PostComment(user_id, movie_id, body, parent_id) {
  console.log(parent_id);
  const url = "http://localhost:4000/comment/";

  const { data } = await axios.post(url, {
    user_id,
    movie_id,
    body,
    parent_id,
  });

  return data;
}

export async function DeleteComment(comment_id) {
  const url = "http://localhost:4000/comment/";

  const { data } = await axios.delete(url, { data: { comment_id } });

  return data;
}

export async function UpdateComment(comment_id, body) {
  const url = "http://localhost:4000/comment/";

  const { data } = await axios.put(url, { comment_id, body });

  return data;
}
