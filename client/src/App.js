import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import Detail from "./pages/Detail/Detail";
import Movies from "./pages/Movies/Movies";
import Signup from "./pages/Auth/Signup/Signup";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedRoute2 from "./pages/ProtectedRoute2";
import PersonDetail from "./pages/PersonDetail/PersonDetail";
import List from "./pages/List/List";
import CreateNewList from "./pages/CreateNewList/CreateNewList";
import SearchMovieByGenreResults from "./pages/SearchMovieByGenreResults/SearchMovieByGenreResults";

//Contexts
import { ListProvider } from "./context/ListContext";
import { AuthProvider } from "./context/AuthContext";
import { StatesProvider } from "./context/StatesContext";

//Components
import Navbar from "./components/Navbar/Navbar";
import TopRatedMovies from "pages/TopRatedMovies/TopRatedMovies";
import AccountSettings from "pages/AccountSettings/AccountSettings";
import PageNotFound from "components/PageNotFound/PageNotFound";
import SendLink from "pages/ResetPassword/SendLink/SendLink";
import Reset from "pages/ResetPassword/Reset/Reset";

function App() {
  return (
    <BrowserRouter>
      <StatesProvider>
        <AuthProvider>
          <ListProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Movies />}>
                <Route path=":query" element={<Movies />}>
                  <Route path=":pageId" element={<Movies />} />
                </Route>
              </Route>
              <Route path="/genre" element={<SearchMovieByGenreResults />}>
                <Route
                  path=":genreName"
                  element={<SearchMovieByGenreResults />}
                >
                  <Route
                    path=":pageId"
                    element={<SearchMovieByGenreResults />}
                  />
                </Route>
              </Route>
              <Route path="/detail" element={<Detail />}>
                <Route path=":id" element={<Detail />} />
              </Route>
              <Route path="/name" element={<PersonDetail />}>
                <Route path=":name_id" element={<PersonDetail />} />
              </Route>
              <Route path="/user" element={<Profile />}>
                <Route path=":user_id" element={<Profile />} />
              </Route>
              <Route path="/movies/top-rated" element={<TopRatedMovies />}>
                <Route path=":pageId" element={<TopRatedMovies />} />
              </Route>

              <Route path="/list" element={<List />}>
                <Route path=":listId" element={<List />} />
              </Route>

              <Route
                path="/user/:userId/ratings"
                element={<List calledType="ratings" />}
              />

              <Route
                path="/reset-password/:user_id/:token"
                element={<Reset />}
              />

              <Route element={<ProtectedRoute2 />}>
                <Route path="/reset-password" element={<SendLink />} />
                <Route path="/signup" element={<Signup title="Sign Up" />} />
                <Route path="/signin" element={<Signin title="Sign In" />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                {/* <Route path="/profile" element={<Profile title="Profile" />} /> */}
                <Route path="/list/create" element={<CreateNewList />} />

                <Route
                  path="/user/:userId/watchlist"
                  element={<List calledType="watchlist" />}
                />

                <Route
                  path="/user/:userId/watchedlist"
                  element={<List calledType="watchedlist" />}
                />
                <Route path="/account-settings" element={<AccountSettings />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ListProvider>
        </AuthProvider>
      </StatesProvider>
    </BrowserRouter>
  );
}

export default App;
