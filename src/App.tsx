import { useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movieList, SetMovieList] = useState(moviesFromServer);

  const addNewMovie = (movie: Movie) => {
    SetMovieList([...movieList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList
          movies={movieList}
        />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
