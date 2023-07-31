import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [moviesList, setMoviesList] = useState<Movie[]>(moviesFromServer);

  const onAddMovie = (movie: Movie) => {
    setMoviesList([...moviesList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>

      <div className="sidebar">
        <NewMovie
          onAdd={onAddMovie}
        />
      </div>
    </div>
  );
};
