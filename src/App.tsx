import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [preparedMovies, setPreparedMovies] = useState(moviesFromServer);

  const addPreparedMovie = (movie: Movie) => {
    setPreparedMovies((prevMovieList) => [...prevMovieList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={preparedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addPreparedMovie} />
      </div>
    </div>
  );
};
