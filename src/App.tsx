import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [moviesToRender, setMoviesToRender] = useState(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setMoviesToRender(prev => ([...prev, movie]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesToRender} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
