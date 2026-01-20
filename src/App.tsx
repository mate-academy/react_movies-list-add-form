import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App = () => {
  const [visiblemovies, setVisibleMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visiblemovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            setVisibleMovies([...visiblemovies, movie]);
          }}
          key={visiblemovies.length + 1}
        />
      </div>
    </div>
  );
};
