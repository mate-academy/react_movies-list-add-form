import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

type Movie = {
  title: string,
  description: string | '',
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export const App = () => {
  const [movie, setMovie] = useState(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setMovie([...movie, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
