import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [newMoviesList, setNewMoviesList] = useState(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setNewMoviesList(prevState => {
      return [...prevState, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMoviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
