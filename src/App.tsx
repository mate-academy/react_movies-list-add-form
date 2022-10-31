import { FC, useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [count, setCount] = useState(0);

  const addMovie = (movie: Movie) => {
    setMovies(currentMovies => [...currentMovies, movie]);

    setCount(current => current + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} key={count} />
      </div>
    </div>
  );
};
