import { useState } from 'react';

import { Movie } from './types/Movie';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import './App.scss';

export const App = () => {
  const [moviesToRender, setMoviesToRender] = useState([...moviesFromServer]);
  const addMovie = (movie: Movie) => {
    if (moviesToRender.find(
      movieRendered => movie.imdbId === movieRendered.imdbId,
    )) {
      // eslint-disable-next-line no-alert
      alert('Movie ID exists in current list');

      return;
    }

    setMoviesToRender(currentMovies => [...currentMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesToRender} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
