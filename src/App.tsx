import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/typedefs';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, addMovie] = useState(moviesFromServer);

  const onAdd = (movie: Movie) => {
    addMovie((oldMoviesList) => {
      return [
        ...oldMoviesList,
        movie,
      ];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
