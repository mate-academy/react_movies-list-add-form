import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [postOfmovie, setpostOfmovie] = useState<Movie[]>(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setpostOfmovie(currentPostOfMovie => [...currentPostOfMovie, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={postOfmovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
