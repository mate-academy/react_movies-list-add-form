import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState([...moviesFromServer]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie:
        {
          title: string;
          description: string;
          imgUrl: string;
          imdbUrl: string; imdbId: string; }) => {
          setMovies(prevState => [...prevState, movie]);
        }}
        />
      </div>
    </div>
  );
};
