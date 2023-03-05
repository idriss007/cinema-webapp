import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatesContext from "../../context/StatesContext";
import styles from "./navbar.module.css";

function Navbar() {

    const navigate = useNavigate();
    const searchBoxInput = useRef(null);

    const {searchQuery, setSearchQuery} = useContext(StatesContext);

    function handleChange(e) {
        setSearchQuery(e.target.value);
    }

    function handleClick() {
        const path = searchQuery.length !== 0 && "/search/" + searchQuery
        navigate(path);
        setSearchQuery("");
    }

    function handleKeyPress(e) {
        if(e.which === 13) {
            const path = searchQuery.length !== 0 && "/search/" + searchQuery
            navigate(path);
            setSearchQuery("");
            searchBoxInput.current.blur();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>Logo</div>
            <div className={styles.searchBox}>
                <input ref={searchBoxInput} onKeyDown={handleKeyPress} value={searchQuery} onChange={handleChange} className={styles.searchBoxInput} placeholder="Arama yap..." />
                <button onClick={handleClick} className={styles.searchButton} >Ara</button>
            </div>
            <div className={styles.menu}>
                <Link style={{textDecoration: "none", color: "inherit",}} to="/signup" >Menu</Link>
            </div>
        </div>
    );
}

export default Navbar;