import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

interface Movie{
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const App = () => {
  const [listOfMovies, setListOfMovies] = useState(moviesFromServer);

  function addMovie(movie: Movie) {
    const expandedList = [...listOfMovies, movie];

    setListOfMovies(expandedList);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={listOfMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => {
          addMovie(movie);
        }}
        />
      </div>
    </div>
  );
};
