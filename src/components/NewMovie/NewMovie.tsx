import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+' +
      '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\.\\w_]*)#?' +
      '(?:[,.!\\/\\\\\\w]*))?)$',
  );

  const isValidUrl = (value: string) => pattern.test(value);
  const isValidImdbId = (value: string) => /^tt\d+$/.test(value);

  const isFormValid =
    !!title.trim() &&
    !!imgUrl.trim() &&
    !!imdbUrl.trim() &&
    !!imdbId.trim() &&
    isValidUrl(imgUrl) &&
    isValidUrl(imdbUrl) &&
    isValidImdbId(imdbId);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetForm();
    setCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => {
          setTitle(newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => {
          setDescription(newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue => {
          setImgUrl(newValue);
        }}
        required
        validate={isValidUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => {
          setImdbUrl(newValue);
        }}
        required
        validate={isValidUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => {
          setImdbId(newValue);
        }}
        required
        validate={isValidImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            disabled={!isFormValid}
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
