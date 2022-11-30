import './App.scss';
import { useState } from 'react';
import { NewMovie } from './components/NewMovie';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [moviesForRender, setMoviesForRender] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesForRender} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => {
          setMoviesForRender(curr => [...curr, movie]);
        }}
        />
      </div>
    </div>
  );
};
