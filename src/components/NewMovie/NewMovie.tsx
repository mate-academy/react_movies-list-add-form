import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types';
import { validateUrls } from '../../utils';
import { DEFAULT_FORM_VALUES } from './consts';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);
  const [count, setCount] = useState(0);

  function resetFormInputs() {
    setFormData(DEFAULT_FORM_VALUES);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(prevState => prevState + 1);
    onAdd(formData);
    resetFormInputs();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      onSubmit={handleSubmit}
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
        error={!isImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleInputChange}
        error={!isImdbUrlValid}
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
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
