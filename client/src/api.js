// import axios, { all } from "axios";
import axios from "axios";

const externalApiAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

externalApiAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access-token");
  config.headers.Authorization = token;
  return config;
});

// axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export async function fetchMovies(query, page_number) {
  const url = `search/movie?include_adult=false&api_key=${
    process.env.REACT_APP_API_URL
  }&query=${query}&page=${page_number ? page_number : 1}`;

  const { data } = await externalApiAxios.get(url);
  return data;
}

export async function fetchNowPlayingOrUpcomingMovies(query) {
  const url = `movie/${query}api_key=${process.env.REACT_APP_API_URL}&region=US`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function fetchUpcomingMovies(date) {
  const url = `discover/movie?api_key=${process.env.REACT_APP_API_URL}&sort_by=popularity.desc&primary_release_date.gte=${date}&with_watch_monetization_types=flatrate`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function fetchTrailer(movieId) {
  const url = `movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_URL}`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getRecommendationsForMovie(movie_id) {
  const url = `movie/${movie_id}/recommendations?api_key=${process.env.REACT_APP_API_URL}`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getImages(id) {
  const url = `movie/${id}?api_key=${process.env.REACT_APP_API_URL}&append_to_response=images`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getGenreList() {
  const url = `genre/movie/list?api_key=${process.env.REACT_APP_API_URL}`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getDetail(id, appendToResponse) {
  const url = `movie/${id}?api_key=${process.env.REACT_APP_API_URL}${
    appendToResponse ? `&append_to_response=${appendToResponse}` : ""
  }`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getCredits(movie_id) {
  const url = `movie/${movie_id}/credits?api_key=${process.env.REACT_APP_API_URL}`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getMoviesByGenre(genre_id, page_number) {
  const url = `discover/movie?include_adult=false&api_key=${
    process.env.REACT_APP_API_URL
  }&sort_by=popularity.desc&with_genres=${genre_id}&page=${
    page_number ? page_number : 1
  }`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getPersonDetail(name_id) {
  const url = `person/${name_id}?api_key=${process.env.REACT_APP_API_URL}`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getPersonCredit(name_id) {
  const url = `person/${name_id}/movie_credits?api_key=${process.env.REACT_APP_API_URL}`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function getCreditDetails(credit_id) {
  const url = `credit/${credit_id}?api_key=${process.env.REACT_APP_API_URL}`;

  const { data } = await externalApiAxios.get(url);

  return data;
}

export async function GetTopRatedMovies(page_number) {
  const url = `movie/top_rated?api_key=${process.env.REACT_APP_API_URL}&page=${
    page_number ? page_number : 1
  }`;

  const { data } = await externalApiAxios.get(url);

  return data;
}
