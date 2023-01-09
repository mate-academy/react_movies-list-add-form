import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [newMoviesAdded, setNewMoviesAdded] = useState([...moviesFromServer]);

  const addMovie = (
    newMovie: Movie,
    event: React.FormEvent<Element>,
    clearFunction: CallableFunction,
  ) => {
    setNewMoviesAdded(current => [
      ...current,
      newMovie,
    ]);

    event.preventDefault();
    clearFunction();
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMoviesAdded} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
        />
      </div>
    </div>
  );
};
