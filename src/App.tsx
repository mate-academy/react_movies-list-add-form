import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setMovies(prevState => (
      [...prevState, movie]
    ));
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
