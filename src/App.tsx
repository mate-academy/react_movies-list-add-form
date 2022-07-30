import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

let movies = [...moviesFromServer];

export const App: React.FC = () => {
  const [newFilm, setNewFilm] = useState<null | Movie>(null);

  if (newFilm !== null) {
    movies = [...movies, newFilm];
    setNewFilm(null);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie setNewFilm={setNewFilm}/* onAdd={(movie) => {}} */ />
      </div>
    </div>
  );
};
