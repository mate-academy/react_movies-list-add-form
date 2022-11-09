import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [newMovies, setNewMovies] = useState(moviesFromServer);
  const [count, setCount] = useState(0);

  const addNewMovie = (movie: Movie) => {
    setNewMovies((curMovies) => [...curMovies, movie]);
    setCount(value => value + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} count={count} />
      </div>
    </div>
  );
};
