import './App.scss';
import { useState } from 'react';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

export const App = () => {
  const [currentMovies, setCurrentMovies] = useState(moviesFromServer);

  const addMovie = (addNewMovie: Movie) => {
    setCurrentMovies((prev) => {
      return [...prev, addNewMovie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currentMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
        />
      </div>
    </div>
  );
};
