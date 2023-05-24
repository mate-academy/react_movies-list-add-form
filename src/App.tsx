import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [currentMoviesList,
    setCurrentMoviesList] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setCurrentMoviesList(previousMoviesList => {
      return [...previousMoviesList, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currentMoviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
