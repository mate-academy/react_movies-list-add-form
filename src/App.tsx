import React, { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const addMovie = (newMovie:Movie) => {
    setMovies(prevState => [...prevState, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie addMovie={addMovie} />
      </div>
    </div>
  );
};
