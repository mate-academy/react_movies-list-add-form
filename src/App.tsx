import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React, { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const onAdd = function (newMovie: Movie) {
    setMovies(previousMovies =>
      previousMovies ? [...previousMovies, newMovie] : [newMovie],
    );
  };

  return (
    <div className="page">
      <div className="page-content">
        {movies && <MoviesList movies={movies} />}
      </div>
      <div className="sidebar">
        {movies ? (
          <NewMovie movies={movies} onAdd={onAdd} />
        ) : (
          <NewMovie onAdd={onAdd} />
        )}
      </div>
    </div>
  );
};
