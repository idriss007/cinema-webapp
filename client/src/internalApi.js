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
  const url = "lists";

  const { data } = await internalApiAxios.post(url, input);

  return data;
}

export async function fetchList(list_id) {
  const url = `lists/${list_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function fetchLists(user_id) {
  const url = `lists/users/${user_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function AddToList(list_id, movieData) {
  const movie_id = movieData.id;

  const url = `lists/${list_id}/${movie_id}`;

  const { data } = await internalApiAxios.post(url, { movieData });

  return data;
}

export async function RemoveFromList(list_id, movieData) {
  const movie_id = movieData.id;

  const url = `lists/${list_id}/${movie_id}`;

  const { data } = await internalApiAxios.delete(url, { data: { movieData } });

  return data;
}

export async function DeleteList(list_id) {
  const url = "lists/";

  const { data } = await internalApiAxios.delete(url, { data: { list_id } });

  return data;
}

export async function SetRatingsPrivacy(listId) {
  const url = "lists/set-privacy";

  const { data } = await internalApiAxios.post(url, { listId });

  return data;
}

//RatingList Methods

export async function createRatingList(input) {
  const url = "ratings";

  const { data } = await internalApiAxios.post(url, input);

  return data;
}

export async function addRating(input) {
  const url = "ratings";
  console.log(input);

  const { data } = await internalApiAxios.put(url, input);

  return data;
}

export async function DeleteRating(input) {
  const url = "ratings";

  const { data } = await internalApiAxios.delete(url, { data: input });

  return data;
}

export async function GetRating(user_id, movie_id) {
  const url = `ratings/users/${user_id}/${movie_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function GetAllRatings(user_id, movie_id) {
  const url = `ratings/users/${user_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

//Comment İşlemleri

export async function FetchAllComments(movie_id, user_id) {
  const url = `comments/${movie_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function GetUsersComments(user_id) {
  const url = `comments/users/${user_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

export async function PostComment(movie_id, body, parent_id) {
  const url = "comments/";

  const { data } = await internalApiAxios.post(url, {
    movie_id,
    body,
    parent_id,
  });

  return data;
}

export async function DeleteComment(comment_id) {
  const url = "comments/";

  const { data } = await internalApiAxios.delete(url, {
    data: { comment_id },
  });

  return data;
}

export async function UpdateComment(comment_id, body) {
  const url = "comments/";

  const { data } = await internalApiAxios.put(url, {
    comment_id,
    body,
  });

  return data;
}

export async function GetUser(user_id) {
  const url = `users/${user_id}`;

  const { data } = await internalApiAxios.get(url);

  return data;
}

//User Settings

export async function ChangeName(new_name, password) {
  const url = "users/change-name";

  const { data } = await internalApiAxios.post(url, { new_name, password });

  return data;
}

export async function ChangeEmail(new_email, password) {
  const url = "users/change-email";

  const { data } = await internalApiAxios.post(url, { new_email, password });

  return data;
}

export async function ChangePassword(current_password, new_password) {
  const url = "users/change-password";

  const { data } = await internalApiAxios.post(url, {
    current_password,
    new_password,
  });

  return data;
}

export async function ChangeProfileImage(profile_image) {
  const url = "users/uploads";

  const { data } = await internalApiAxios.post(url, profile_image);

  return data;
}

export async function sendResetPasswordLink(email) {
  const url = "users/send-reset-password-link";

  const { data } = await internalApiAxios.post(url, { email });

  return data;
}

export async function resetPassword(user_id, token, password) {
  const url = `users/reset-password/${user_id}/${token}`;

  const { data } = await internalApiAxios.post(url, { password });

  return data;
}
