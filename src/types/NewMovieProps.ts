import { Movie } from './Movie';

export type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};
