import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie, Movie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import React from 'react';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(current => [...current, newMovie]);
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
