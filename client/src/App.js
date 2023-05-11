import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import { StatesProvider } from "./context/StatesContext";
import Movies from "./pages/Movies/Movies";
import Signup from "./pages/Auth/Signup/Signup";
import Signin from "./pages/Auth/Signin/Signin";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import ProtectedRoute2 from "./pages/ProtectedRoute2";
import { ListProvider } from "./context/ListContext";
import PersonDetail from "./pages/PersonDetail/PersonDetail";
import List from "./pages/List/List";
import CreateNewList from "./pages/CreateNewList/CreateNewList";
import SearchMovieByGenreResults from "./pages/SearchMovieByGenreResults/SearchMovieByGenreResults";

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

              <Route element={<ProtectedRoute2 />}>
                <Route path="/signup" element={<Signup title="Sign Up" />} />
                <Route path="/login" element={<Signin title="Sign In" />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile title="Profile" />} />
                <Route path="/list/create" element={<CreateNewList />} />
                <Route path="/list" element={<List />}>
                  <Route path=":listId" element={<List />} />
                </Route>
                <Route
                  path="/user/:userId/watchlist"
                  element={<List calledType="watchlist" />}
                />
                <Route
                  path="/user/:userId/ratings"
                  element={<List calledType="ratings" />}
                />
              </Route>
            </Routes>
          </ListProvider>
        </AuthProvider>
      </StatesProvider>
    </BrowserRouter>
  );
}

export default App;
