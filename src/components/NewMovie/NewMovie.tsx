import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const initialForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [imageValidationError, setImageValidationError] = useState(false);
  const [imdbValidationError, setImdbValidationError] = useState(false);

  const {
    title,
    description,
    imgUrl,
    imdbId,
    imdbUrl,
  } = form;

  const validateInput = (name: string, value: string) => {
    switch (name) {
      case 'imdbUrl':
        if (value.length) {
          setImdbValidationError(!value.match(pattern));
        }

        break;

      case 'imgUrl':
        if (value.length) {
          setImageValidationError(!value.match(pattern));
        }

        break;
      default:
        break;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      validateInput(name, value);
    }

    setForm(currentForm => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setForm(initialForm);
    setCount(prevCount => prevCount + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event?.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    clearForm();
  };

  const isButtonDisabled = !(
    title
    && imgUrl
    && imdbId
    && imdbUrl
    && !imageValidationError
    && !imdbValidationError);

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
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        isImgError={imageValidationError}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        isImdbError={imdbValidationError}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
