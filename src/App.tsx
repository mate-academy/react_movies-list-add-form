import { useState } from 'react';
import { Movie } from './types/Movie';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

const callbackCopyMovies = (movies: Movie[]) => {
  return movies.map((movie: Movie) => ({ ...movie }));
};

export const App = () => {
  const [movies, setMovies] = useState(callbackCopyMovies(moviesFromServer));

  const handlerNewMovie = (movie: Movie) => {
    const copyMovies: Movie[] = callbackCopyMovies(movies);

    copyMovies.push(movie);

    setMovies(copyMovies);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handlerNewMovie} />
      </div>
    </div>
  );
};
