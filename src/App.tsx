import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const App = () => {
  const [films, setFilms] = useState<Movie[]>(moviesFromServer as Movie[]);
  const handleAdd = (newMovie: Movie): void => {
    setFilms(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={films} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAdd} />
      </div>
    </div>
  );
};
