import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [hasMovieError, setNewMovieError] = useState('');
  const [visibleError, setVisibleError] = useState(false);

  const addMovie = (movie: Movie) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = movie;

    switch (title || description || imdbId || imdbUrl || imgUrl) {
      case title:
      case description:
      case imdbId:
      case imdbUrl:
      case imgUrl:
        setNewMovieError('All fields must be filled');
        setVisibleError(true);

        return;

      default:
        setVisibleError(false);
    }

    setMovies([
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
        <NewMovie
          onAdd={addMovie}
        />
        {visibleError && (
          <span className="sidebar__error-movie">{hasMovieError}</span>
        )}
      </div>
    </div>
  );
};
