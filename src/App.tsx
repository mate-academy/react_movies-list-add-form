import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [visibleMovies, setVisibleMovies] = useState(moviesFromServer);

  const handleAdd = (newMovie: Movie) => {
    setVisibleMovies((currentMovies => [...currentMovies, newMovie]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAdd} />
      </div>
    </div>
  );
};
