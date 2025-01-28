/* eslint-disable curly */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
// import './App.scss';
// import { MoviesList } from './components/MoviesList';
// import { NewMovie } from './components/NewMovie';
// import moviesFromServer from './api/movies.json';

// export const App = () => {
//   return (
//     <div className="page">
//       <div className="page-content">
//         <MoviesList movies={moviesFromServer} />
//       </div>
//       <div className="sidebar">
//         <NewMovie /* onAdd={(movie) => {}} */ />
//       </div>
//     </div>
//   );
// };
import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import initialMovies from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(initialMovies);

  const handleAddMovie = (newMovie: {
    title: string;
    description?: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};




