import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types';
import { validateUrls } from '../../utils';
import { DEFAULT_VALUE_FOR_INPUT } from './consts';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: DEFAULT_VALUE_FOR_INPUT,
    description: DEFAULT_VALUE_FOR_INPUT,
    imgUrl: DEFAULT_VALUE_FOR_INPUT,
    imdbUrl: DEFAULT_VALUE_FOR_INPUT,
    imdbId: DEFAULT_VALUE_FOR_INPUT,
  });
  const [count, setCount] = useState(0);

  function resetFormInputs() {
    setFormData({
      title: DEFAULT_VALUE_FOR_INPUT,
      description: DEFAULT_VALUE_FOR_INPUT,
      imgUrl: DEFAULT_VALUE_FOR_INPUT,
      imdbUrl: DEFAULT_VALUE_FOR_INPUT,
      imdbId: DEFAULT_VALUE_FOR_INPUT,
    });
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(prevState => prevState + 1);
    onAdd(formData);
    resetFormInputs();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isImdbUrlValid = validateUrls(formData.imdbUrl);
  const isImgUrlValid = validateUrls(formData.imgUrl);
  const isSubmitDisabled = (
    !formData.title
    || !formData.imdbId
    || !isImdbUrlValid
    || !isImgUrlValid
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleOnSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleOnChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleOnChange}
        error={!isImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleOnChange}
        error={!isImdbUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleOnChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
