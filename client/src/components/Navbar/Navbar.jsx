import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovies } from "../../api";
import AuthContext from "../../context/AuthContext";
import StatesContext from "../../context/StatesContext";
import styles from "./navbar.module.css";

function Navbar() {

    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
        fontWeight: "bold"
    }

    const { loggedIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const searchBoxInput = useRef(null);

    const { searchQuery, setSearchQuery } = useContext(StatesContext);
    const [movies, setMovies] = useState();

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
        })()

    }, [searchQuery])

    async function handleChange(e) {
        setSearchQuery(e.target.value);
    }

    function handleClick() {
        const path = searchQuery.length !== 0 && "/search/" + searchQuery
        navigate(path);
        setSearchQuery("");
    }

    function handleKeyPress(e) {
        if (e.which === 13) {
            const path = searchQuery.length !== 0 && "/search/" + searchQuery
            navigate(path);
            setSearchQuery("");
            searchBoxInput.current.blur();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link reloadDocument className="btn btn-primary" style={linkStyle} to="/" >Home</Link>
            </div>

            <div className={styles.search}>

                <div className={styles.searchInputs}>
                    <input ref={searchBoxInput} onKeyDown={handleKeyPress} value={searchQuery} onChange={handleChange} className={styles.searchBoxInput} placeholder="Search a movie" />
                    <button onClick={handleClick} className={styles.searchButton} >Search</button>
                </div>
                {movies?.length > 0 ?
                    (
                        <div className={styles.queryResultContainer}>
                            {movies?.map(movie => {
                                return <div><p>{movie.original_title}</p></div>
                            })}
                        </div>
                    ) : null
                }
            </div>

            <div className={styles.menu}>
                {!loggedIn && (
                    <>
                        <div className={styles.authButton}>
                            <Link reloadDocument className="btn btn-primary" style={linkStyle} to="/login" >Login</Link>
                        </div>
                        <div className={styles.authButton}>
                            <Link reloadDocument className={"btn btn-primary"} style={linkStyle} to="/signup" >Sign Up</Link>
                        </div>
                    </>
                )}

                {loggedIn && (
                    <>
                        <div className={styles.authButton + " " + styles.profileBtn}>
                            <Link reloadDocument className="btn btn-light" style={linkStyle} to="/profile" >Profile</Link>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}

export default Navbar;