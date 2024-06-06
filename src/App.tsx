import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React, { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [displayedMovies, setDisplayedMovies] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setDisplayedMovies([...displayedMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={displayedMovies} />
      </div>

      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
