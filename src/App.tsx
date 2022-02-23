import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

import './App.scss';

export const App: React.FC = () => {
  const [movies, setMovies] = useState([...moviesFromServer]);

  const addMovie = (movie: Movie) => {
    setMovies([...movies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <h1 className="sidebar__title">Add movie</h1>
        <NewMovie
          onAdd={addMovie}
        />
      </div>
    </div>
  );
};
