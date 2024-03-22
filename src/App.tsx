import './App.scss';

import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App = () => {
  const [newMovies, setNewMovies] = useState<Movie[]>([]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={[...moviesFromServer, ...newMovies]} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => {
            setNewMovies([...newMovies, movie]);
          }}
        />
      </div>
    </div>
  );
};
