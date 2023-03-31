import { Movie } from '../../types/Movie';

export type Props = {
  onAdd: (newMovie: Movie) => void;
};
