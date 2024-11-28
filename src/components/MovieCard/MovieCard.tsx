import React from 'react';
import './MovieCard.scss';
import { Movie } from '../../types/Movie';

type Props = {
  movie: Movie;
};

export const MovieCard: React.FC<Props> = ({ movie }) => (
  <div className="card" data-cy="movie-card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={movie.imgUrl} alt={`${movie.title} poster`} />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src="images/imdb-logo.jpeg" alt="IMDb" />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-5">{movie.title}</p>
        </div>
      </div>

      <div className="content">
        {movie.description}
        <br />
        <a href={movie.imdbUrl} target="_blank" rel="noopener noreferrer">
          IMDb
        </a>
      </div>
    </div>
  </div>
);
