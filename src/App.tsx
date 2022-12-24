import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [moviesToRender, setMoviesToRender] = useState(moviesFromServer);

  const addNewFilm = (movie: Movie) => {
    setMoviesToRender(current => [
      ...current,
      movie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesToRender} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewFilm} />
      </div>
    </div>
  );
};
