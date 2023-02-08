import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [updatedMovies, setUpdatedMovies] = useState<Movie[]>(moviesFromServer);
  const addNewMovie = (movie: Movie) => {
    setUpdatedMovies(prevMovies => (
      [...prevMovies, movie]
    ));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={updatedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
