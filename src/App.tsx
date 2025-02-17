import { useState } from 'react';
import moviesFromServer from './api/movies.json';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { Movie, NewMovie } from './components/NewMovie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setMovies(prev => [...prev, movie]);
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
