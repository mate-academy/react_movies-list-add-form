import { useState } from 'react';
import './App.scss';
import moviesFromServer from './api/movies.json';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovies, setVisibleMovies] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    const index = visibleMovies.findIndex(m => m.imdbId === movie.imdbId);

    if (index === -1) {
      setVisibleMovies(prev => [...prev, movie]);
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
