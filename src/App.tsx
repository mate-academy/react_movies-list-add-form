import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

const initialMovie: Movie[] = moviesFromServer.map(e => ({ ...e }));

export const App = () => {
  const [movies, setMovie] = useState<Movie[]>(initialMovie);

  function addMovies(movie: Movie) {
    setMovie(e => [...e, movie]);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovies} />
      </div>
    </div>
  );
};
