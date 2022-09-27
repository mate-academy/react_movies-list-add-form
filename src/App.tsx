import { FC, useState } from 'react';
import './App.scss';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: FC = () => {
  const [initialMovies, setMovies] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    setMovies((movies) => [...movies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={initialMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
