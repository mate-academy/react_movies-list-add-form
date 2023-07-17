import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';


export const App = () => {
  const [movieList, setMovieList] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
   setMovieList(currentList => [...currentList, movie])
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
        />
      </div>
    </div>
  );
};
