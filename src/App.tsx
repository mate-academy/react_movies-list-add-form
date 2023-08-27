import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

const movies = moviesFromServer.map((movie) => ({
  ...movie,
  movieId: movie.imdbId,
}));

export const App = () => {
  const [moviesCount, increaseMoviesCount] = useState(movies.length);

  const onAdd = (movie: Movie) => {
    if (moviesCount === movies.length) {
      movies.push(movie);
      increaseMoviesCount(oldMoviesCount => oldMoviesCount + 1);
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
