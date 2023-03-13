import React from "react";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import styles from "./home.module.css";

function Home() {

    return (
        <div className={styles.container} >


            <p className={styles.title}>Vizyondaki Filmler</p>
            <div className={styles.innerContainer + " " + styles.vizyondakiFilmlerContainer}>

                <MovieSlider query="now_playing?" />
            </div>
            
            <p className={styles.title}>Yakında Vizyona Girecek Filmler</p>

            <div className={styles.innerContainer + " " + styles.gelecekFilmlerContainer}>
                <MovieSlider query="upcoming?" />
            </div>
        </div>
    );

}

export default Home;