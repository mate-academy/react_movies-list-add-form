import { Movie } from './Movie';

export interface Props {
  onAdd: (movie: Movie) => void;
}
