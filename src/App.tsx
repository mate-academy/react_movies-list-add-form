import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import  { useState } from 'react';

export const App = () => {

  const movieList = moviesFromServer.map((movie: Movie) => movie);
  const [newMovie , setNewMovie] = useState(movieList)
  const addNewMovie = (newMovie: Movie) => {
    const newMovieObj = { ...newMovie };
    setNewMovie((currentMovies) => [...currentMovies, newMovieObj]);
  };
  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovie} />
      </div>
      <div className="sidebar">
        <NewMovie  onAdd={addNewMovie}  />
      </div>
    </div>
  );
};
