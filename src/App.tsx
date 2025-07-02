import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList/MoviesList';
import { NewMovie } from './components/NewMovie/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

// Importy stylów (jeśli są potrzebne w tym pliku)
import './App.scss';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, newMovie]);
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
