import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

// type movies = {
//   title: string;
//   description: string;
//   imgUrl: string;
//   imdbUrl: string;
//   imdbId: string;
// }

// const movies: {
//   title: string;
//   description: string;
//   imgUrl: string;
//   imdbUrl: string;
//   imdbId: string;
// }[]

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  // const addFilm = (movie: Movie) => {
  //   setMovies(previous => {
  //     const newMovie = {
  //       ...movie,
  //     };

  //     return [...previous, newMovie];
  //   });
  // };

  const addFilm = (movie: Movie) => {
    setMovies(previous => [...previous, movie]);
  };

  // const addFilm = (movie: any) => {
  //   const newMovie = {
  //     ...movie,
  //   };

  //   setMovies(previous => [...previous, newMovie]);
  // };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addFilm} />
      </div>
    </div>
  );
};
