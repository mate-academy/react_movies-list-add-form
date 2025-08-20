import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [formResetKey, setFormResetKey] = useState(0);

  const addMovie = (movie: Movie) => {
    setMovies(current => [...current, movie]);

    setFormResetKey(prevKey => prevKey + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie key={formResetKey} onAdd={addMovie} />
      </div>
    </div>
  );
};
