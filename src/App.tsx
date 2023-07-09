import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';
import './App.scss';

export const App = () => {
  const [currentMovies, setCurrentMovies] = useState<Movie[]>(moviesFromServer);
  const addMovie = ({ ...data }: Movie) => {
    const newMovie = { ...data };

    setCurrentMovies(movies => [...movies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currentMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
