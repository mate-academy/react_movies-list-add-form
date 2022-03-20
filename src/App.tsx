import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

// interface State {
//   movies: Movie[];
// }

/**
 *
 *
 */

export const App: React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const addMovie = (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  ) => {
    const newFilm = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setMovies([...movies, newFilm]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie addMovie={addMovie} />
      </div>
    </div>
  );
};
