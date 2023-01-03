import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [visibleMovies, setVisibleMovie] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setVisibleMovie([...visibleMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
        />
      </div>
    </div>
  );
};
