import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, addMovie] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={movie => addMovie([
          ...movies, movie,
        ])}
        />
      </div>
    </div>
  );
};
