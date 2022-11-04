import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [movieList, setMovieList] = useState(moviesFromServer);
  const onAddMovie = (movie: Movie) => {
    setMovieList(currentMovieList => [
      ...currentMovieList,
      movie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAddMovie} />
      </div>
    </div>
  );
};
