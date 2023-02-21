import React, { useState } from 'react';
import './App.scss';

import moviesFromServer from './api/movies.json';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [listMovies, setListMovies] = useState(moviesFromServer);
  
  const addMovie = (newMovie: Movie) => {
    setListMovies((movies) => [...movies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={listMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
