import { FC, useState } from 'react';
import './App.scss';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

export const App: FC = () => {
  const [visibleMovies, setVisibleMovies] = useState(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setVisibleMovies(prevMovies => ([
      ...prevMovies,
      movie,
    ]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
