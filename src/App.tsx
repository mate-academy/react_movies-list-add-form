import { useState } from 'react';
import './App.scss';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);
  const addNewMovie = (movie: Movie) => setMoviesList([...moviesList, movie]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
