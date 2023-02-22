import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [visibleMovies, setMoviesList] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    return setMoviesList([...visibleMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
