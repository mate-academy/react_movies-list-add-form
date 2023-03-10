import './App.scss';
import { useState } from 'react';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movie, setMovie] = useState(moviesFromServer);
  const onAddNewMovie = (newMovie: Movie) => {
    setMovie(curr => [
      ...curr,
      newMovie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList
          movies={movie}
        />
      </div>

      <div className="sidebar">
        <NewMovie
          onAdd={onAddNewMovie}
        />
      </div>
    </div>
  );
};
