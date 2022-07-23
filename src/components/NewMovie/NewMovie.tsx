import './NewMovie.scss';
import { useState } from 'react';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const emptyMovieInputs  = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }

  const [newMovie, setNewMovie] = useState(emptyMovieInputs);

  const validForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emptyMovieInputs) {
      onAdd(newMovie);
      setNewMovie(emptyMovieInputs);
    }
  };

  return (
    <form
      className="form"
      onSubmit={validForm}
    >
      <input
        type="text"
        placeholder="Enter movie title"
        className="form__title"
        value={emptyMovieInputs.title}
        data-cy="form-title"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            title: event.target.value
          });
        }}
      />

      <textarea
        name="description"
        id=""
        className="form__description"
        placeholder="Enter description"
        value={emptyMovieInputs.description}
        data-cy="form-description"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            description: event.target.value,
          });
        }}
      />

      <input
        type="text"
        placeholder="Enter image URL"
        className="form__img"
        value={emptyMovieInputs.imgUrl}
        data-cy="form-imgUrl"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            imgUrl: event.target.value
          });
        }}
      />

      <input
        type="text"
        placeholder="Enter Imdb URL"
        value={emptyMovieInputs.imdbUrl}
        className="form__imdbUrl"
        data-cy="form-imdbUrl"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            imdbUrl: event.target.value
          });
        }}
      />

      <input
        type="text"
        placeholder="Enter Imdb ID"
        value={emptyMovieInputs.imdbId}
        className="form__imbId"
        data-cy="form-imdbId"
        onChange={(event) => {
          setNewMovie({
            ...newMovie,
            imdbId: event.target.value
          });
        }}
      />

      <button
        type="submit"
        className="form__button"
        data-cy="form-submit-button"
      >
        Submit
      </button>
    </form>
  );
};
