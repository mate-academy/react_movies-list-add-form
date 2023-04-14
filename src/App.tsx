import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [count, setCount] = useState(0);

  const increseCount = () => {
    setCount(currentCount => currentCount + 1);
  };

  const addNewMovie = (newMovie: Movie) => {
    setMovies(currentMovies => ([
      ...currentMovies,
      newMovie,
    ]));

    increseCount();
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} key={count} />
      </div>
    </div>
  );
};
