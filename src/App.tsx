import { useState } from 'react';

import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

import './App.scss';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const handleMovieAddition = (movie: Movie) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleMovieAddition} />
      </div>
    </div>
  );
};
