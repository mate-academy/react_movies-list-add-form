import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = (NewMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, NewMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
