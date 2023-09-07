import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageNewUrl] = useState('');
  const [imdbUrl, setNewImdbUrl] = useState('');
  const [imdbId, setNewImdbId] = useState('');
  const [textError, setTextError] = useState(' is required');

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const isUrlValid = (url: string) => url.match(pattern);
  const isValidData = title && imgUrl && imdbUrl && imdbId;

  const clearTheForm = () => {
    setTitle('');
    setDescription('');
    setImageNewUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  const clearWrongFields = () => {
    setTextError(' invalid. Please try again.');
    setImageNewUrl('');
    setNewImdbUrl('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isUrlValid(imgUrl) || !isUrlValid(imdbUrl)) {
      clearWrongFields();

      throw new Error('Invalid Url');
    }

    setCount(prevCount => prevCount + 1);

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    clearTheForm();
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
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImageNewUrl}
        required
        textError={textError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setNewImdbUrl}
        required
        textError={textError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setNewImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidData}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
