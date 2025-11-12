import { Movie } from '../../types/Movie';
import './MovieCard.scss';

interface Props {
  movie: Movie;
}

export const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <div className="card" data-cy="movie-card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={movie.imgUrl}
            alt={`${movie.title} poster`}
            data-cy="movie-poster"
          />
        </figure>
      </div>

      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4" data-cy="movie-title">
              {movie.title}
            </p>
            <p className="subtitle is-6" data-cy="movie-imdb-id">
              {movie.imdbId}
            </p>
          </div>
        </div>

        <div className="content" data-cy="movie-description">
          {movie.description || 'No description available.'}
          <br />
          <a
            href={movie.imdbUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cy="movie-imdb-link"
          >
            View on IMDB
          </a>
        </div>
      </div>
    </div>
  );
};
