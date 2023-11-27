import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movie, setMovie] = useState(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setMovie(currMovie => [...currMovie, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movie} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
        />
      </div>
    </div>
  );
};
