import React from 'react';
import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviList, setMoveList] = useState<Movie[]>(moviesFromServer);
  const addMove = (newMovie: Movie) => {
    setMoveList(currentList => [...currentList, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMove} />
      </div>
    </div>
  );
};
