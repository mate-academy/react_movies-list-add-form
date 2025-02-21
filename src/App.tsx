import './App.scss';
import { useState } from 'react';

import moviesFromServer from './api/movies.json';

import { Movie } from './types/Movie';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleNewMovie = (newMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleNewMovie} />
      </div>
    </div>
  );
};
