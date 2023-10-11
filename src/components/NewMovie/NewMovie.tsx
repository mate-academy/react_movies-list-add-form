import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (urlPattern.test(formData.imgUrl) && urlPattern.test(formData.imdbUrl)) {
      const movie: Movie = { ...formData };

      setCount(prev => prev + 1);
      onAdd(movie);
      setFormData(movieTemplate);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please, provide valid URL');
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={validateForm}>
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
            disabled={
              !(
                formData.title
                && formData.imgUrl
                && formData.imdbUrl
                && formData.imdbId
              )
            }
          >
            Add
          </button>
          {errorMessage && (
            <p>{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export { NewMovie };
