import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React, { useState } from 'react';
import { Values } from './types/Values';

export const App = () => {
  const [preparedMovieList, setPreparedMovieList] =
    useState<Values[]>(moviesFromServer);

  const handleAddMovie = (movie: Values) => {
    setPreparedMovieList(prevMovieList => [...prevMovieList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList
          movies={preparedMovieList.map(movie => ({
            ...movie,
            description: movie.description || '',
          }))}
        />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
