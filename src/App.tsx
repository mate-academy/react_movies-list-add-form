import "./App.scss";
import { MoviesList } from "./components/MoviesList";
import { NewMovie } from "./components/NewMovie";
import moviesFromServer from "./api/movies.json";
import { Movie } from "./types/Movie";
import { useCallback, useEffect, useState } from "react";

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(moviesFromServer);
  }, []);

  const onAdd = useCallback((movie: Movie) => {
    setMovies((prevState) => [...prevState, movie]);
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
