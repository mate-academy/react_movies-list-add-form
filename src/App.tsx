import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesActual, setMovies] = useState<Movie[]>(moviesFromServer);

  const AddMovie = ({
    title, description, imgUrl, imdbUrl, imdbId,
  }:Movie) => {
    const newMovie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    setMovies(actualMovies => [...actualMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesActual} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={AddMovie} />
      </div>
    </div>
  );
};
