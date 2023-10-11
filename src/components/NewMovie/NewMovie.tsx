import React, { useState } from 'react';
import classnames from 'classnames';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import './NewMovie.scss';

// eslint-disable-next-line max-len
const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const movieTemplate: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = { onAdd: (movie: Movie) => void };

const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(movieTemplate);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isAllRequiredFilled = !!(
    formData.title
    && formData.imgUrl
    && formData.imdbUrl
    && formData.imdbId
  );
  const isAllUrlsValid = (
    urlPattern.test(formData.imgUrl) && urlPattern.test(formData.imdbUrl)
  );
  const [hasError, setHasError] = useState(isAllRequiredFilled);

  const handleInputChange = (name:string, value:string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!isAllRequiredFilled) {
      setErrorMessage('Please, fill all required fields');

      return false;
    }

    if (!isAllUrlsValid) {
      setErrorMessage('Please, provide valid URL(s)');

      return false;
    }

    setErrorMessage(null);

    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const movie: Movie = { ...formData };

    onAdd(movie);
    setFormData(movieTemplate);
    setCount(prev => prev + 1);
  };

  return (
    <form
      className={classnames('NewMovie form', {
        danger: hasError,
      })}
      key={count}
      onSubmit={onSubmit}
      onBlur={() => {
        const isValidUrl = validateForm();

        setHasError(!(isValidUrl && isAllRequiredFilled));
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllRequiredFilled || !isAllUrlsValid}
          >
            Add
          </button>
          {errorMessage && (
            <p className="danger">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export { NewMovie };
