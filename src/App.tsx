import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [
    moviesFromServerWithNew,
    setMoviesFromServerWithNew,
  ] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesFromServerWithNew} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => {
          setMoviesFromServerWithNew([
            ...moviesFromServerWithNew,
            movie]);
        }}
        />
      </div>
    </div>
  );
};
