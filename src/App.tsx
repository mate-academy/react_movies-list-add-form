import React, { useCallback } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesList, setMoviesList] = React.useState(moviesFromServer);

  const handelAddMovie = useCallback(
    (movie: Movie) => {
      setMoviesList(prevMoviesList => {
        return [
          ...prevMoviesList,
          movie,
        ];
      });
    },
    [moviesList],
  );

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handelAddMovie} />
      </div>
    </div>
  );
};
