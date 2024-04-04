import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React, { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesState, setMovieState] = useState(moviesFromServer);
  const addMoviesState = (movie: Movie) => {
    setMovieState(currentMovies => [...currentMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesState} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMoviesState} />
      </div>
    </div>
  );
};
