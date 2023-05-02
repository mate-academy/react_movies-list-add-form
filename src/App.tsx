import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movieArray, setNewMovie] = useState(moviesFromServer);
  const newMovieFunction = (newMovie: Movie) => {
    setNewMovie(state => (
      [...state, newMovie]
    ));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieArray} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={newMovieFunction}
        />
      </div>
    </div>
  );
};
