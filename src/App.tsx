import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesServer, setMoviesServer] = useState<Movie[]>(moviesFromServer);
  const onAdd = (newmovie:Movie) => {
    setMoviesServer((movies) => [...movies, newmovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesServer} />
      </div>
      <div className="sidebar">
        <NewMovie
          addMovie={onAdd}
        />
      </div>
    </div>
  );
};
