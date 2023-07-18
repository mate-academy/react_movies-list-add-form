import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [values, setValues] = useState(initialState);
  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);

  const isDisabledButton = () => {
    return !values.title.trim()
      || !values.imdbUrl.trim()
      || !values.imdbId.trim()
      || !values.imgUrl.trim();
  };

  const reset = () => {
    setValues(initialState);
    setIsImgUrlValid(true);
    setIsImdbUrlValid(true);

    setCount(currentCount => currentCount + 1);
  };

  const newMovie: Movie = {
    title: values.title,
    imgUrl: values.imgUrl,
    description: values.description,
    imdbUrl: values.imdbUrl,
    imdbId: values.imdbId,
  };

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === 'imgUrl') {
      setIsImgUrlValid(pattern.test(value));
    } else if (name === 'imdbUrl') {
      setIsImdbUrlValid(pattern.test(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isImgUrlValid && isImdbUrlValid) {
      onAdd(newMovie);
    }

    reset();
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
        value={values.title}
        onChange={(event) => handleChange('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={(event) => handleChange('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={(event) => handleChange('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={(event) => handleChange('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={(event) => handleChange('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabledButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
