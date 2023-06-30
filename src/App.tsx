import { useState } from 'react';

import { Movie } from './types/Movie';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import './App.scss';

/*

Original title: The Umbrella Academy
A family of former child heroes, now grown apart, must reunite to continue to protect the world.
https://www.imdb.com/title/tt1312171/
tt1312171
https://m.media-amazon.com/images/M/MV5BNTZlNTY4ZGMtMzJjZC00NWFkLWFkZjItZDc2Y2Y1NGUyNzFhXkEyXkFqcGdeQXVyMTE5MTg5NDIw._V1_FMjpg_UY3000_.jpg
*/

export const App = () => {
  const initialMovies = [...moviesFromServer];
  const [moviesToRender, setMoviesToRender] = useState([...initialMovies]);
  const addMovie = (movie: Movie) => {
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
