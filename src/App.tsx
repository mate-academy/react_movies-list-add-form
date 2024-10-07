import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [movieList, setMovieList] = useState<Movie[]>(moviesFromServer)

  const movie = (newMovie:Movie) =>{
    setMovieList(currentMovieList=>[...currentMovieList, newMovie])
  }


  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={movie} />
      </div>
    </div>
  );
};
