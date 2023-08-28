import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);
  const addNewMovie = (newMovie: Movie) => {
    setMoviesList(initialMovies => {
      return [...initialMovies,
        newMovie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
