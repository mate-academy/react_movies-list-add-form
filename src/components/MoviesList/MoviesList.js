import React from 'react';
import { MoviesListShape } from '../Shapes';
import './MoviesList.scss';
import { MovieCard } from '../MovieCard';

export const MoviesList = ({ movies }) => (
  <div className="movies">
    { movies.map(movie => (
      <MovieCard key={movie.imdbId} {...movie} />
    )) }
  </div>
);

MoviesList.propTypes = MoviesListShape.isRequired;

MoviesList.defaultProps = {
  movies: [],
};
