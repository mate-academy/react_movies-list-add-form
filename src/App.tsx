import { useState } from 'react';
import './App.scss';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);

  const onAddMovie = (movie: Movie) => {
    setMoviesList(prevMovieList => [...prevMovieList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAddMovie={onAddMovie} />
      </div>
    </div>
  );
};
