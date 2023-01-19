import './App.scss';
import { useState, useCallback, memo } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = memo(() => {
  const [movies, setMovies] = useState(moviesFromServer);

  const addNewMovie = useCallback((movie: Movie) => {
    setMovies((prev) => {
      return [...prev, movie];
    });
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
});
