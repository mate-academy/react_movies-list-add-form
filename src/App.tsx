import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [currentMoviesList, setCurrentMoviesList] = useState(moviesFromServer);

  const handleAddNewMovie = (movie: Movie) => {
    setCurrentMoviesList((prevState) => {
      return [...prevState, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">

        <MoviesList movies={currentMoviesList} />
      </div>
      <div className="sidebar">

        <NewMovie onAdd={handleAddNewMovie} />
      </div>
    </div>
  );
};
