export interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

interface Movie {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
}
