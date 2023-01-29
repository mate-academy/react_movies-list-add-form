import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

const preparedMovies = moviesFromServer.map(movie => ({
  ...movie,
}));

export const App:React.FC = () => {
  const [listMovieCards, setListMovieCards] = useState(preparedMovies);

  const addNewMovieCard = (newMovie: Movie) => {
    setListMovieCards([...listMovieCards, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={listMovieCards} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie) => {
          addNewMovieCard(movie);
        }}
        />
      </div>
    </div>
  );
};
