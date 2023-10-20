import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [newMoviesList, setNewMoviesList] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMoviesList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => setNewMoviesList([...newMoviesList, movie])}
        />
      </div>
    </div>
  );
};
