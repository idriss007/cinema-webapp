import axios, { all } from "axios";

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
  const url = `search/movie?api_key=${
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

// //USER İŞLEMLERİ

// export async function fetchRegister(values) {
//   const url = "http://localhost:4000/auth/register";

//   const { data } = await axios.post(url, values);

//   return data;
// }

// export async function fetchLogin(values) {
//   const url = "http://localhost:4000/auth/login";

//   const { data } = await axios.post(url, values);

//   return data;
// }

// export async function fetchMe() {
//   const url = "http://localhost:4000/auth/me";

//   const { data } = await axios.get(url);

//   return data;
// }

// export async function fetchAccessTokenByRefreshToken() {
//   const url = "http://localhost:4000/auth/refresh_token";

//   const { data } = await axios.post(url, {
//     refresh_token: localStorage.getItem("refresh-token"),
//   });

//   return data;
// }

// export async function fetchLogout() {
//   const url = "http://localhost:4000/auth/logout";

//   const { data } = await axios.post(url, {
//     refresh_token: localStorage.getItem("refresh-token"),
//   });

//   return data;
// }

// export async function postList(input) {
//   const url = "http://localhost:4000/list";

//   const { data } = await axios.post(url, input);

//   return data;
// }

// export async function fetchList(list_id) {
//   const url = "http://localhost:4000/list/list/" + list_id;

//   const { data } = await axios.get(url);

//   return data;
// }

// export async function fetchLists(user_id) {
//   const url = "http://localhost:4000/list/" + user_id;

//   const { data } = await axios.get(url);

//   return data;
// }

// export async function AddToList(list_id, movieData) {
//   const movie_id = movieData.id;

//   const url = "http://localhost:4000/list/add/" + list_id + "/" + movie_id;

//   const { data } = await axios.post(url, { movieData });

//   return data;
// }

// export async function RemoveFromList(list_id, movieData) {
//   const movie_id = movieData.id;

//   const url = "http://localhost:4000/list/delete/" + list_id + "/" + movie_id;

//   const { data } = await axios.post(url, { movieData });

//   return data;
// }

// export async function DeleteList(list_id) {
//   const url = "http://localhost:4000/list/";

//   const { data } = await axios.delete(url, { data: { list_id } });

//   return data;
// }

// //RatingList Methods

// export async function createRatingList(input) {
//   const url = "http://localhost:4000/rating";

//   const { data } = await axios.post(url, input);

//   return data;
// }

// export async function addRating(input) {
//   const url = "http://localhost:4000/rating/add";

//   const { data } = await axios.post(url, input);

//   return data;
// }

// export async function DeleteRating(input) {
//   const url = "http://localhost:4000/rating/delete";

//   const { data } = await axios.post(url, input);

//   return data;
// }

// export async function GetRating(user_id, movie_id) {
//   const url = "http://localhost:4000/rating/" + user_id + "/" + movie_id;

//   const { data } = await axios.get(url);

//   return data;
// }

// //Comment İşlemleri

// export async function FetchAllComments(movie_id, user_id) {
//   if (movie_id) {
//     const url = "http://localhost:4000/comment/" + movie_id;

//     const { data } = await axios.get(url);

//     return data;
//   } else {
//     const url = "http://localhost:4000/comment/" + user_id;

//     const { data } = await axios.get(url);

//     return data;
//   }
// }

// export async function PostComment(user_id, movie_id, body, parent_id) {
//   console.log(parent_id);
//   const url = "http://localhost:4000/comment/";

//   const { data } = await axios.post(url, {
//     user_id,
//     movie_id,
//     body,
//     parent_id,
//   });

//   return data;
// }

// export async function DeleteComment(comment_id, user_id) {
//   const url = "http://localhost:4000/comment/";

//   const { data } = await axios.delete(url, { data: { comment_id, user_id } });

//   return data;
// }

// export async function UpdateComment(comment_id, body, user_id) {
//   const url = "http://localhost:4000/comment/";

//   const { data } = await axios.put(url, { comment_id, body, user_id });

//   return data;
// }
