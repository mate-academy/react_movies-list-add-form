import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);

  const addMovie = (title: string, description: string, imgUrl: string,
    imdbUrl: string, imdbId: string) => {
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (!imdbUrl) {
      return null;
    }

    return setMoviesList(current => [...current, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
