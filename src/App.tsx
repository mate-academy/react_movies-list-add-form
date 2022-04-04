import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovie] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setMovie((current: Movie[]) => [...current, movie]);
  };

  const validId = (id: string) => {
    return movies.some(movie => movie.imdbId === id);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} validId={validId} />
      </div>
    </div>
  );
};
