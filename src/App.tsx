import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

type Movie = {
  title: string,
  description: string,
  imdbUrl: string,
  imgUrl: string,
  imdbId: string,
};

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const onMovieAddedHandler = (movie: Movie) => {
    setMovies((prev: Movie[]) => [...prev, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onMovieAddedHandler} />
      </div>
    </div>
  );
};
