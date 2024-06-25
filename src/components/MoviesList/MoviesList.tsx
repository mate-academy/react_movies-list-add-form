import React from 'react';
import './MoviesList.scss';
import { MovieCard } from '../MovieCard';

interface Movie {
  title: string;
  description?: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface MoviesListProps {
  movies: Movie[];
}

export const MoviesList: React.FC<MoviesListProps> = ({ movies }) => (
  <div className="movies">
    {movies.map(movie => (
      <MovieCard key={movie.imdbId} movie={movie} />
    ))}
  </div>
);
