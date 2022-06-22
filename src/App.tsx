import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setMovies(() => [
      ...movies,
      movie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <div className="card">
          <div className="newMovie">
            <p className="title newMovie-title">
              Add a new movie:
            </p>
            <NewMovie onAdd={addMovie} />
          </div>
        </div>
      </div>
    </div>
  );
};
