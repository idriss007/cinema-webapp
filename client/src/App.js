import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Navbar from "./components/Navbar/Navbar";
import { StatesProvider } from "./context/StatesContext";
import Movies from "./pages/Movies/Movies";
import Signup from "./pages/Auth/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <StatesProvider>
        <Navbar />
        <Routes>
          <Route path="/search" element={<Movies />}>
            <Route path=":query" element={<Movies />} />
          </Route>
          <Route path="/detail" element={<Detail />} >
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </StatesProvider>
    </BrowserRouter>
  );
}

export default App;
