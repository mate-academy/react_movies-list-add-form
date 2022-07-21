import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [moviesError, setMoviesError] = useState(false);

  const addMovie = (movie: Movie): void => {
    if (movie.title.length === 0
      || movie.description.length === 0
      || movie.imdbId.length === 0
      || movie.imdbUrl.length === 0
      || movie.imgUrl.length === 0
    ) {
      setMoviesError(true);

      return;
    }

    setMovies([
      ...movies,
      movie,
    ]);

    setMoviesError(false);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
        />
        {moviesError && (
          <h2 className="sidebar__error-movie">
            All field must be valid
          </h2>
        )}
      </div>
    </div>
  );
};
