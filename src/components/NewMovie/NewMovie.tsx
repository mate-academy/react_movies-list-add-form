import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const validateInputs =
    title &&
    imgUrl &&
    pattern.test(imgUrl) &&
    imdbUrl &&
    pattern.test(imdbUrl) &&
    imdbId;

  function resetInput() {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    resetInput();
    setCount(prev => prev + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        handleSubmit(event);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={str => setTitle(str)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={str => setDescription(str)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={str => setImgUrl(str)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={str => setImdbUrl(str)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={str => setImdbId(str)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {validateInputs ? (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled
            >
              Add
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
