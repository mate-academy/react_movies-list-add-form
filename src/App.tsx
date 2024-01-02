import { useEffect, useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie, MovieList } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<MovieList>([]);

  useEffect(() => {
    setMovies([...moviesFromServer]);
  }, []);

  const onMovieAdd = (movie: Movie) => {
    const trimmedMovie: Movie = { ...movie };

    Object.keys(trimmedMovie).forEach((key) => {
      if (typeof trimmedMovie[key] === 'string') {
        trimmedMovie[key] = trimmedMovie[key].trim();
      }
    });

    setMovies(prevMovies => [...prevMovies, trimmedMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onMovieAdd} />
      </div>
    </div>
  );
};
