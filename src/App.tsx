import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovie, setVisibleMovie] = useState(moviesFromServer);
  const appendMovie = (movie: Movie) => {
    setVisibleMovie((prevState) => ([
      ...prevState,
      movie,
    ]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={appendMovie} />
      </div>
    </div>
  );
};
