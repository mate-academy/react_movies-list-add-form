import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { Movie } from './types/Movie';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addNewMovie = (newMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
