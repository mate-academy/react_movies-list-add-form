import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [updateMovies, setUpdateMovies] = useState(moviesFromServer);
  const addNewMovie = (movie: Movie) => {
    setUpdateMovies(prevMovies => ([
      ...prevMovies,
      movie,
    ]
    ));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={updateMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
