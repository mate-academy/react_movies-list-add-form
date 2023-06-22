import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovies, setVisibleMovies] = useState(moviesFromServer);

  const addMovieHandler = ({
    title, description, imgUrl, imdbUrl, imdbId,
  }: Movie) => {
    const movieToAdd = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setVisibleMovies(prevMovies => [...prevMovies, movieToAdd]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovieHandler} />
      </div>
    </div>
  );
};
