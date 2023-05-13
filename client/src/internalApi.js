import axios, { all } from "axios";

const internalApiAxios = axios.create({
  baseURL: "http://localhost:4000/",
});

internalApiAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access-token");
  config.headers.Authorization = token;
  return config;
});

// axios.defaults.baseURL = "http://localhost:4000/";

//USER İŞLEMLERİ

export async function fetchRegister(values) {
  const url = "auth/register";

  const { data } = await internalApiAxios.post(url, values);

  return data;
}

export async function fetchLogin(values) {
  const url = "auth/login";

  const { data } = await internalApiAxios.post(url, values);

  return data;
}

export async function fetchMe() {
  const url = "auth/me";

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function fetchAccessTokenByRefreshToken() {
  const url = "auth/refresh_token";

  const { data } = await internalApiAxios.post(url, {
    refresh_token: localStorage.getItem("refresh-token"),
  });

  return data;
}

export async function fetchLogout() {
  const url = "auth/logout";

  const { data } = await internalApiAxios.post(url, {
    refresh_token: localStorage.getItem("refresh-token"),
  });

  return data;
}

//List İşlemleri

export async function postList(input) {
  const url = "list";

  const { data } = await internalApiAxios.post(url, input);

  return data;
}

export async function fetchList(list_id) {
  const url = `list/list/${list_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function fetchLists(user_id) {
  const url = `list/${user_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function AddToList(list_id, movieData) {
  const movie_id = movieData.id;

  const url = `list/add/${list_id}/${movie_id}`;

  const { data } = await internalApiAxios.post(url, { movieData });

  return data;
}

export async function RemoveFromList(list_id, movieData) {
  const movie_id = movieData.id;

  const url = `list/delete/${list_id}/${movie_id}`;

  const { data } = await internalApiAxios.post(url, { movieData });

  return data;
}

export async function DeleteList(list_id) {
  const url = "list/";

  const { data } = await internalApiAxios.delete(url, { data: { list_id } });

  return data;
}

//RatingList Methods

export async function createRatingList(input) {
  const url = "rating";

  const { data } = await internalApiAxios.post(url, input);

  return data;
}

export async function addRating(input) {
  const url = "rating/add";

  const { data } = await internalApiAxios.post(url, input);

  return data;
}

export async function DeleteRating(input) {
  const url = "rating/delete";

  const { data } = await internalApiAxios.post(url, input);

  return data;
}

export async function GetRating({ user_id, movie_id }) {
  const url = `rating/${user_id}/${movie_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

//Comment İşlemleri

export async function FetchAllComments(movie_id, user_id) {
  if (movie_id) {
    const url = `comment/${movie_id}`;

    const { data } = await internalApiAxios.get(url);

    return data;
  } else {
    const url = `comment/${user_id}`;

    const { data } = await internalApiAxios.get(url);

    return data;
  }
}

export async function GetUsersComments(user_id) {
  const url = `comment/user/${user_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function PostComment(movie_id, body, parent_id) {
  const url = "comment/";

  const { data } = await internalApiAxios.post(url, {
    movie_id,
    body,
    parent_id,
  });

  return data;
}

export async function DeleteComment(comment_id) {
  const url = "comment/";

  const { data } = await internalApiAxios.delete(url, {
    data: { comment_id },
  });

  return data;
}

export async function UpdateComment(comment_id, body) {
  const url = "comment/";

  const { data } = await internalApiAxios.put(url, {
    comment_id,
    body,
  });

  return data;
}
