import { IMovie } from './Movie';

export interface INewMovie {
  onAdd: (movie: IMovie) => void;
}
