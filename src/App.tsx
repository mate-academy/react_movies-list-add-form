import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServerData from './api/movies.json';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

const movies = moviesFromServerData.map(movie => ({
  ...movie,
  imdbId: movie.imdbId || '',
}));

export const App = () => {
  const [moviesFromServer, setMoviesFromServer] = useState(movies);

  const handleAddMovie = (newMovie: Movie) => {
    setMoviesFromServer(prevMovies => [newMovie, ...prevMovies]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesFromServer} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
