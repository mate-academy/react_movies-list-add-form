import { useState } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import { Movie } from './types/Movie';

import './App.scss';

import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const handleMovieAdd = (movie: Movie): void => {
    setMovies(prevMovies => [
      ...prevMovies,
      movie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleMovieAdd} />
      </div>
    </div>
  );
};
