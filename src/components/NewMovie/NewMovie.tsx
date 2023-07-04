import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const intitialMovieForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieForm, setMovieForm] = useState(intitialMovieForm);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movieForm;

  const enteredRequiredFields = title && imgUrl && imdbUrl && imdbId;

  const clearForm = () => {
    setMovieForm(intitialMovieForm);
    setCount(current => current + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(movieForm);

    clearForm();
  };

  const changeMovieForm = (key: string, value: string) => {
    setMovieForm((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => changeMovieForm('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => changeMovieForm('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => changeMovieForm('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => changeMovieForm('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => changeMovieForm('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!enteredRequiredFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
