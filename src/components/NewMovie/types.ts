import { Movie } from '../../types/Movie';

export interface INewMovieProps {
  onAdd: (movie: Movie) => void;
}
