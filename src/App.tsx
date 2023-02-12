import './App.scss';
import { useState } from 'react';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [currentMovies, setCurrentMovies] = useState(moviesFromServer);

  const addNewMovie = (newMovie: Movie) => {
    setCurrentMovies(prevMovies => (
      [...prevMovies, newMovie]
    ));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currentMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
