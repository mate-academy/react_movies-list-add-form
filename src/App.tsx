import { useState } from 'react';
import { Movie } from './types/Movie';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const handleMovieAdding = (movie : Movie) => {
    setMovies(state => [...state, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleMovieAdding} />
      </div>
    </div>
  );
};
