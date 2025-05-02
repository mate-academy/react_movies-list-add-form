import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { useState } from 'react';
import moviesFromServer from './api/movies.json';
import React from 'react';

export type Movie = {
  title: string;
  imgUrl: string;
  imdbId: string;
  imdbUrl: string;
  description: string;
};

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const onAdd = (newMovie: Movie): void => {
    setMovies(p => {
      return [...p, newMovie];
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
