import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovies, setVisibleMovies]
    = useState<Movie[]>([...moviesFromServer]);
  const handleAddMovies = (movie: Movie) => {
    setVisibleMovies((prevState) => [...prevState, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovies} />
      </div>
    </div>
  );
};
