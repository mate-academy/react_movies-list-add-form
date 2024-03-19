import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          key={count}
          onAdd={movie => {
            setMovies(current => [...current, movie]);
            setCount(current => current + 1);
          }}
        />
      </div>
    </div>
  );
};
