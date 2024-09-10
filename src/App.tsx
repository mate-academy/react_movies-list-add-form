import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import React, { useState } from 'react';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const addNewMovie = (NewMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, NewMovie])
  }
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
