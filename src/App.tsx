import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [count, setCount] = useState(0);

  const handleMovie = (movie: Movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
    setCount(current => current + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie key={count} onAdd={handleMovie} />
      </div>
    </div>
  );
};
