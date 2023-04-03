import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [currentMovieList, setCurrentMovieList] = useState(moviesFromServer);

  const handleSubmit = (movie: Movie) => {
    setCurrentMovieList((prevState) => {
      return [...prevState, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currentMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleSubmit} />
      </div>
    </div>
  );
};
