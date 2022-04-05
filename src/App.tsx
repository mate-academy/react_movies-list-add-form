import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setMovies((prevMovies) => ([
      ...prevMovies, movie,
    ]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <h2 className="title">Add film</h2>
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
