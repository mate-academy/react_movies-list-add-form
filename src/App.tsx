import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [allMovie, setAllMovie] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={allMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie: Movie) => setAllMovie([...allMovie, movie])} />
      </div>
    </div>
  );
};
