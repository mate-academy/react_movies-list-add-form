import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';
import { NewMovie } from './components/NewMovie/NewMovie';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, newMovie]);
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
