import React, { useState } from 'react';
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

const urlRegex = new RegExp([
  /(?:(?:(https?|ftp):)?\/\/)/,
  /(?:([^:\n\r]+):([^@\n\r]+)@)?/,
  /(?:(?:www.)?([^/\n\r]+))/,
  /(\/[^?\n\r]+)?/,
  /(\?[^#\n\r]*)?/,
  /(#?[^\n\r]*)?/,
].map(reg => reg.source).join(''));

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (name: string, value: string) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const isAllFieldsValid = () => {
    return formValues.title
    && formValues.imdbId
    && formValues.imdbUrl
    && formValues.imgUrl
    && urlRegex.test(formValues.imdbUrl)
    && urlRegex.test(formValues.imgUrl);
  };

  const handleResetForm = () => {
    setCount(count + 1);
    setFormValues(initialState);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: formValues.title,
      description: formValues.description,
      imgUrl: formValues.imgUrl,
      imdbUrl: formValues.imdbUrl,
      imdbId: formValues.imdbId,
    });

    handleResetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      onReset={handleResetForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={(event) => handleChange('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={(event) => handleChange('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={(event) => handleChange('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={(event) => handleChange('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={(event) => handleChange('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllFieldsValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
