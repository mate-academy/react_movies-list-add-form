import './App.scss';
import { useState } from 'react'; // Import useState
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

// Define the Movie type
type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setMovies((prevMovies: Movie[]) => [...prevMovies, movie]); // Specify the type of prevMovies
  };

  return (
    <div className="page">
      <div className="page-content">
        {/* Render only the updated movie list */}
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        {/* Pass the onAdd prop to NewMovie */}
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
