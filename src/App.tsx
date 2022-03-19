import React, { useState } from 'react';
import moviesFromServer from './api/movies.json';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    const nextMovies = [...movies, movie];

    setMovies(nextMovies);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie handleOnAdd={addMovie} />
      </div>
    </div>
  );
};
