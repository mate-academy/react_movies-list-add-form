import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movieList, setMovieList] = useState(moviesFromServer);

  const onMovieSubmit = (newMovie: Movie) => {
    setMovieList(prevList => {
      return [...prevList, newMovie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onMovieSubmit} />
      </div>
    </div>
  );
};
