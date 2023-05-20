import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

//External Api
import { fetchMovies } from "api";

//Contexts
import AuthContext from "context/AuthContext";
import StatesContext from "context/StatesContext";

//Components
import SearchBox from "components/SearchBox/SearchBox";

//React Icons
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

//Stylesheet
import styles from "./navbar.module.css";

function Navbar() {
  const { loggedIn, user, logout } = useContext(AuthContext);
  const { searchQuery, setSearchQuery } = useContext(StatesContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const searchBoxInput = useRef(null);

  const [movies, setMovies] = useState();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    (async () => {
      if (searchQuery?.length > 0) {
        try {
          const moviesData = await fetchMovies(searchQuery);
          setMovies(moviesData.results);
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
      // setMovies();
      // const path = searchQuery.length !== 0 && "/search/" + searchQuery;
      // navigate(path);
      // navigate(0);
      // setSearchQuery("");
      // searchBoxInput.current.blur();
    }
  }

  return (
    <div
      className={clsx(
        styles.container,
        "navbar navbar-expand-lg pl-0 pr-0 mb-4"
      )}
    >
      <div
        className={clsx(
          "container customContainer d-flex justify-content-around"
          // "flex-nowrap"
        )}
      >
        <div
          className={clsx(
            styles.logo,
            "mr-auto navbar-brand",
            // hidden ? "d-none d-md-block" : null
            hidden ? styles.hideElement : styles.item
          )}
        >
          <Link
            reloadDocument={true}
            style={{ color: "black", fontWeight: "bold" }}
            className={clsx(styles.linkUrl, "btn bg-warning text-color-dark")}
            to="/"
          >
            Home
          </Link>
        </div>

        <div
          // id="collapseSearchBar"
          className={clsx(
            styles.search,
            hidden ? styles.showSearchBar : styles.hideSearchBar
            // "flex-lg-grow-0 flex-grow-1 ml-3 collapse"
          )}
        >
          <SearchBox
            handleKeyPress={handleKeyPress}
            handleChange={handleChange}
            searchQuery={searchQuery}
            placeholder="Search a movie"
            movies={movies}
            searchBoxInput={searchBoxInput}
          />
        </div>
        <button
          className={clsx(
            styles.dropdownItem,
            styles.navBtn,
            styles.searchIconBtn,
            "text-white ml-0 ml-md-3 mr-0 mr-md-3 p-3 d-flex justify-content-center border-0"
          )}
          onClick={() => setHidden(!hidden)}
          // data-toggle="collapse"
          // data-target="#collapseSearchBar"
        >
          <FaSearch />
        </button>
        <button
          className={clsx(
            "navbar-toggler p-0 ml-0",
            hidden ? styles.hideElement : styles.item
          )}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div>
            <GiHamburgerMenu color="white" size="25" />
          </div>
        </button>

        <div
          className={clsx(
            styles.menu,
            "align-items-center collapse navbar-collapse flex-grow-0 flex-lg-row flex-column "
          )}
          id="navbarNavAltMarkup"
        >
          <div className="">
            <Link
              reloadDocument={true}
              state={{ previousPath: pathname }}
              className={clsx(
                styles.dropdownItem,
                styles.navBtn,
                styles.linkUrl,
                "dropdown-item p-3 d-flex justify-content-center"
              )}
              to="/movies/top-rated"
            >
              Top Rated
            </Link>
          </div>

          {!loggedIn && (
            <div className="navbar-nav">
              <Link
                reloadDocument={true}
                state={{ previousPath: pathname }}
                className={clsx(
                  styles.dropdownItem,
                  styles.navBtn,
                  styles.linkUrl,
                  "dropdown-item p-3 d-flex justify-content-center"
                )}
                to="/login"
              >
                Login<span className="sr-only">(current)</span>
              </Link>
              {/* <Link
                reloadDocument={true}
                state={{ previousPath: pathname }}
                className={clsx(
                  styles.dropdownItem,
                  styles.navBtn,
                  styles.linkUrl,
                  "dropdown-item p-3 d-flex justify-content-center"
                )}
                to="/signup"
              >
                Sign Up
              </Link> */}
            </div>
          )}

          {loggedIn && (
            <>
              <Link
                reloadDocument={true}
                className={clsx(
                  styles.navBtn,
                  styles.navbarDropdown,
                  styles.linkUrl,
                  "nav-item nav-link p-3"
                )}
                to={`user/${user?._id}/watchlist`}
              >
                Watchlist
              </Link>
              <div className={"nav-item dropdown"}>
                <a
                  className={clsx(
                    styles.navbarDropdown,
                    styles.navBtn,
                    "nav-link dropdown-toggle d-flex align-items-center p-3"
                  )}
                  href="/"
                  id={"navbarDropdown"}
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div style={{ height: "16px" }}>
                    <FaUserCircle size="18" className="mr-1" />
                    {user.name}
                  </div>
                </a>
                <div
                  className={clsx(
                    styles.dropdownMenu,
                    "dropdown-menu m-0 p-0 dropdown-menu-right mt-2"
                  )}
                  aria-labelledby="navbarDropdown"
                >
                  <div>
                    <Link
                      className={clsx(
                        styles.dropdownItem,
                        styles.topItem,
                        styles.linkUrl,
                        "dropdown-item p-3 d-flex justify-content-center"
                      )}
                      reloadDocument={true}
                      to={`/user/${user._id}`}
                    >
                      Profile
                    </Link>
                  </div>
                  <div>
                    <Link
                      className={clsx(
                        styles.dropdownItem,
                        styles.linkUrl,
                        "dropdown-item p-3 d-flex justify-content-center"
                      )}
                      reloadDocument={true}
                      to={`/user/${user._id}/ratings`}
                    >
                      <p>Your Ratings</p>
                    </Link>
                  </div>
                  <div>
                    <Link
                      className={clsx(
                        styles.dropdownItem,
                        styles.linkUrl,
                        "dropdown-item p-3 d-flex justify-content-center"
                      )}
                      reloadDocument={true}
                      to={`/user/${user._id}/watchedlist`}
                    >
                      <p>Watchedlist</p>
                    </Link>
                  </div>
                  {/* <div className="dropdown-divider"></div> */}
                  <div>
                    <Link
                      className={clsx(
                        styles.dropdownItem,
                        styles.linkUrl,
                        "dropdown-item p-3 d-flex justify-content-center"
                      )}
                      reloadDocument={true}
                      to={"/account-settings"}
                    >
                      <p>Account Settings</p>
                    </Link>
                  </div>
                  <Link
                    className={clsx(
                      styles.dropdownItem,
                      styles.bottomItem,
                      styles.linkUrl,
                      "dropdown-item p-3 d-flex justify-content-center"
                    )}
                    reloadDocument={true}
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
    </div>
  );
}

export default Navbar;
