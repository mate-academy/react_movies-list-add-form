import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [listMovie, setListMovie] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={listMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie: Movie) => {
          setListMovie([...listMovie, movie]);
        }}
        />
      </div>
    </div>
  );
};
