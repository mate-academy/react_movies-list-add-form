import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieType = {
  onAdd: (m: Movie) => void,
};

export const NewMovie: FC<NewMovieType> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  let disabled = true;

  const handleInputTitle = (title: string) => {
    setMovie(state => ({ ...state, title }));
  };

  const handleInputDescription = (description: string) => {
    setMovie(state => ({ ...state, description }));
  };

  const handleInputImgUrl = (imgUrl: string) => {
    setMovie(state => ({ ...state, imgUrl }));
  };

  const handleInputImdbUrl = (imdbUrl: string) => {
    setMovie(state => ({ ...state, imdbUrl }));
  };

  const handleInputImdbId = (imdbId: string) => {
    setMovie(state => ({ ...state, imdbId }));
  };

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(movie);
    setCount((prevCount) => prevCount + 1);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  if (movie.title && movie.imgUrl && movie.imdbUrl && movie.imdbId) {
    disabled = false;
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handlerSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleInputTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
