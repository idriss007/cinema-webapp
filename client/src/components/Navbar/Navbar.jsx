import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovies } from "../../api";
import AuthContext from "../../context/AuthContext";
import StatesContext from "../../context/StatesContext";
import styles from "./navbar.module.css";

import moment from "moment";
import SearchBox from "../SearchBox/SearchBox";

//FontAwesome
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const { loggedIn, user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const searchBoxInput = useRef(null);

  const { searchQuery, setSearchQuery } = useContext(StatesContext);

  const [movies, setMovies] = useState();
  const imgPath = "https://www.themoviedb.org/t/p/w154";

  useEffect(() => {
    (async () => {
      if (searchQuery?.length > 0) {
        try {
          const moviesData = await fetchMovies(searchQuery);
          const slicedMovies = moviesData.results;
          setMovies(slicedMovies);
        } catch (err) {
          console.log(err.message);
        }
      } else {
        setMovies(null);
      }
    })();
  }, [searchQuery]);

  async function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  // function handleClick() {
  //     const path = searchQuery.length !== 0 && "/search/" + searchQuery
  //     navigate(path);
  //     setSearchQuery("");
  // }

  function handleKeyPress(e) {
    if (e.which === 13) {
      const path = searchQuery.length !== 0 && "/search/" + searchQuery;
      navigate(path);
      setSearchQuery("");
      searchBoxInput.current.blur();
    }
  }

  return (
    <div
      className={
        styles.container + " justify-content-lg-between navbar navbar-expand-lg"
      }
    >
      <div className={styles.logo + " navbar-brand"}>
        <Link
          reloadDocument
          className="btn bg-warning"
          style={linkStyle}
          to="/"
        >
          Home
        </Link>
      </div>

      <div className={styles.search + " flex-lg-grow-0 flex-grow-1"}>
        <SearchBox
          handleKeyPress={handleKeyPress}
          handleChange={handleChange}
          searchQuery={searchQuery}
          placeholder="Search a movie"
          movies={movies}
          linkStyle={linkStyle}
          imgPath={imgPath}
        />
      </div>
      <button
        className="navbar-toggler p-0 ml-3"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        {/* <span class={"navbar-toggler-icon " + styles.navbarTogglerIcon}> */}
        <div>
          <GiHamburgerMenu color="white" size="25" />
        </div>
        {/* </span> */}
      </button>
      <div
        className={
          styles.menu +
          " align-items-center collapse navbar-collapse flex-grow-0 flex-lg-row flex-column "
        }
        id="navbarNavAltMarkup"
      >
        {!loggedIn && (
          <div className="navbar-nav">
            <div className={styles.authButton}>
              <Link
                reloadDocument
                className="btn btn-primary nav-item nav-link active"
                style={linkStyle}
                to="/login"
              >
                Login<span class="sr-only">(current)</span>
              </Link>
            </div>
            <div className={styles.authButton}>
              <Link
                reloadDocument
                className={"btn btn-primary nav-item nav-link"}
                style={linkStyle}
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {loggedIn && (
          <>
            <Link
              reloadDocument
              className={
                "nav-item nav-link " +
                styles.navBtn +
                " " +
                styles.navbarDropdown
              }
              style={linkStyle}
              to="/"
            >
              Watchlist
            </Link>
            <div class={"nav-item dropdown " + styles.navBtn}>
              <a
                class={
                  "nav-link dropdown-toggle d-flex align-items-center " +
                  styles.navbarDropdown
                }
                href="/"
                id={"navbarDropdown"}
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  <FaUserCircle size="20" className="mr-1" />
                  {user.name}
                </div>
              </a>
              <div
                class={
                  "dropdown-menu m-0 p-0 dropdown-menu-right mt-2 " +
                  " " +
                  styles.dropdownMenu
                }
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className={
                    "dropdown-item p-3 d-flex justify-content-center " +
                    styles.dropdownItem +
                    " " +
                    styles.topItem
                  }
                  reloadDocument
                  style={linkStyle}
                  to="/profile"
                >
                  Profile
                </Link>
                {/* <div class="dropdown-divider"></div> */}
                <Link
                  className={
                    "dropdown-item p-3 d-flex justify-content-center " +
                    styles.dropdownItem +
                    " " +
                    styles.bottomItem
                  }
                  reloadDocument
                  style={linkStyle}
                  onClick={() => logout()}
                >
                  Sign out
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
