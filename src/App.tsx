import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

const newMovie: Movie[] = moviesFromServer.map(movi => ({ ...movi }));

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(newMovie);

  const onAdd = (newMov: Movie) => {
    setMovies(currentMovies => [...currentMovies, newMov]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
