import { Movie } from './Movie';

export type MovieProps = {
  onAdd: (movie: Movie) => void;
};
