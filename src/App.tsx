import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { MovieType, NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { getRandomDigits } from './components/TextField';

export const App = () => {
  const [visibleMovies, setVisibleMovies] = useState(moviesFromServer);

  const addMovie = ({
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  }: MovieType) => {
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      id: getRandomDigits(),
    };

    setVisibleMovies([...visibleMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
