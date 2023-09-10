/* eslint-disable */
import "./App.scss";
import { MoviesList } from "./components/MoviesList";
import { NewMovie } from "./components/NewMovie";
import moviesFromServer from "./api/movies.json";
import { useState } from "react";
import { Movie } from "./types/Movie";

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);
  const addMovie = (movie: Movie) => {
    setMoviesList([...moviesList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie addMovie={addMovie} />
      </div>
    </div>
  );
};
