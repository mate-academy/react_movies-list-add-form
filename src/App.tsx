import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [
    moviesFromServerWithNew,
    setMoviesFromServerWithNew,
  ] = useState(moviesFromServer);

  const handleAddMovie = (newMovie: Movie) => {
    setMoviesFromServerWithNew((prevMovies) => {
      return [...prevMovies, newMovie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesFromServerWithNew} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
