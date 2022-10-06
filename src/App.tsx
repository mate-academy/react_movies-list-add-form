import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
// import { useState } from 'react';

// type movies = {
//   title: string;
//   description: string;
//   imgUrl: string;
//   imdbUrl: string;
//   imdbId: string;
// }

export const App = () => {
  // const [movies, setMovie] = useState(moviesFromServer);

  // const addFilm = (movie: any) => {
  //   setMovie(state => {
  //     const newMovie = {
  //       movie,
  //     },
  //   });

  //   return {
  //     movies: [ ...movies, NewMovie];
  //   }
  // };


  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesFromServer} />
      </div>
      <div className="sidebar">
        <NewMovie /* onAdd={addFilm} */ />
      </div>
    </div>
  );
};
