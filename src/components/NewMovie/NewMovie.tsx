import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { validateField } from '../../services/validation';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const allRequiredFieldsAreFilled = title.trim()
  && imgUrl.trim()
  && imdbUrl.trim()
  && imdbId.trim();

  const allLinksAreValidated = validateField(imgUrl) && validateField(imdbUrl);

  const clearFormFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    clearFormFields();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Enter a description (optional)"
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allRequiredFieldsAreFilled || !allLinksAreValidated}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
