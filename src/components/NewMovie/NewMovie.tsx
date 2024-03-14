import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const FORM_DEFAULT_VALUES = {
  TITLE: '',
  DESCRIPTION: '',
  IMG_URL: '',
  IMBD_URL: '',
  IMBD_ID: '',
};

type Props = {
  onAdd(movie: Movie): void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [submitionCount, setSubmitionCount] = useState(0);
  const [title, setTitle] = useState(FORM_DEFAULT_VALUES.TITLE);
  const [description, setDescription] = useState(
    FORM_DEFAULT_VALUES.DESCRIPTION,
  );
  const [imgUrl, setImgUrl] = useState(FORM_DEFAULT_VALUES.IMG_URL);
  const [imdbUrl, setImdbUrl] = useState(FORM_DEFAULT_VALUES.IMBD_URL);
  const [imdbId, setImdbId] = useState(FORM_DEFAULT_VALUES.IMBD_ID);
  const isButtonDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ description, imdbId, imdbUrl, imgUrl, title });
    setSubmitionCount(currentSubmitionCount => currentSubmitionCount + 1);
    setTitle(FORM_DEFAULT_VALUES.TITLE);
    setDescription(FORM_DEFAULT_VALUES.DESCRIPTION);
    setImgUrl(FORM_DEFAULT_VALUES.IMG_URL);
    setImdbUrl(FORM_DEFAULT_VALUES.IMBD_URL);
    setImdbId(FORM_DEFAULT_VALUES.IMBD_ID);
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={submitionCount}>
      <h2 className="title">Add a movie</h2>

      <TextField
        required
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        required
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
      />

      <TextField
        required
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
      />

      <TextField
        required
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isButtonDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
