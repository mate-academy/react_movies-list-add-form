import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

import moviesFromServer from './api/movies.json';

import './App.scss';

export const App = () => {
  const [visibleMovie, setVisibleMovie] = useState([...moviesFromServer]);

  const addMovie = (
    movie: Movie,
  ) => {
    const newMovie = {
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    };

    setVisibleMovie(prevValue => [...prevValue, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
