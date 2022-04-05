/// <reference types="react-scripts" />

type Props = {
  onAdd: (movie: Movie) => void,
};

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}
