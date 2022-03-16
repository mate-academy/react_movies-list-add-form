import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = (movieTitle: string,
    movieDescription: string,
    movieImgUrl: string,
    movieImdbUrl: string,
    movieImdbId: string) => {
    const newMovie: Movie = {
      title: movieTitle,
      description: movieDescription,
      imgUrl: movieImgUrl,
      imdbUrl: movieImdbUrl,
      imdbId: movieImdbId,
    };

    setMovies([...movies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
