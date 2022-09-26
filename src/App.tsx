import './App.scss';
import { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { NewMovie } from './components/NewMovie';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const App = () => {
  const [moviesPack, setMoviesPack] = useState(moviesFromServer);

  const onAdd = (movie: Movie): void => {
    setMoviesPack((prevMoviesPack: Movie[]) => {
      return [...prevMoviesPack, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesPack} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
