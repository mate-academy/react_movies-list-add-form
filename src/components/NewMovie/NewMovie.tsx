import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie:Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  // eslint-disable-next-line max-len
  const patternUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const defaultValue = '';
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(defaultValue);
  const [description, setDescription] = useState(defaultValue);
  const [imgUrl, setImgUrl] = useState(defaultValue);
  const [imdbUrl, setImdbUrl] = useState(defaultValue);
  const [imdbId, setImdbId] = useState(defaultValue);

  const isUrlValid = (value:string) => value.match(patternUrl);

  const clearForm = () => {
    setTitle(defaultValue);
    setDescription(defaultValue);
    setImgUrl(defaultValue);
    setImdbUrl(defaultValue);
    setImdbId(defaultValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isUrlValid(imgUrl) || !isUrlValid(imdbUrl)) {
      clearForm();

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
    clearForm();
  };

  const isClickable = (title && imgUrl && imdbUrl && imdbId);

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
            disabled={!isClickable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
