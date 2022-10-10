import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [MovieList, setMoviesList] = useState(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setMoviesList((movi) => {
      return [...movi, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={MovieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
