import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useCallback, useState } from 'react';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const getPreparedMovies = useCallback((movie: Movie) => {
    setMovies(() => moviesFromServer.concat(movie));
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={getPreparedMovies} />
      </div>
    </div>
  );
};
