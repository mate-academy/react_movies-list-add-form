import { useState } from 'react';
import './App.scss';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovies, seVisibleMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = (movie: Movie) => {
    seVisibleMovies(state => [...state, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
