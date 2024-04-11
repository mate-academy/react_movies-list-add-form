import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import React, { useState } from 'react';
import { Movie } from './types/Movie';
import { NewMovie } from './components/NewMovie';

export const App = () => {
  const [finalMovies, setFinalMovies] = useState(moviesFromServer);

  const handleAddMovie = (upgradedMovie: Movie) => {
    setFinalMovies(movies => [...movies, upgradedMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={finalMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
