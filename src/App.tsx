import { useState } from 'react';
import moviesFromServer from './api/movies.json';
import './App.scss';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Header } from './components/Header';

import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([...moviesFromServer]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const addMovie = (movie: Movie): void => {
    setMovies([...movies, movie]);
  };

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`page page--${theme}`}>

      <Header
        changeTheme={changeTheme}
        theme={theme}
      />

      <div className="page-content">
        <MoviesList
          movies={movies}
          theme={theme}
        />
      </div>

      <div className={`sidebar sidebar--${theme}`}>
        <NewMovie
          theme={theme}
          onAdd={(movie) => addMovie(movie)}
        />
      </div>
    </div>
  );
};
