import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [listOfFilms, setListOfFilms] = useState(moviesFromServer);

  const addMovieToList = (movie: Movie) => {
    setListOfFilms([...listOfFilms, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={listOfFilms} />
      </div>

      <div className="sidebar">
        <NewMovie onAdd={addMovieToList} />
      </div>
    </div>
  );
};
