import './App.scss';
import React, { useState } from 'react';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const handleAddMovie = (movie: Movie) => {
    setMovies(currentMovies => [...currentMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
