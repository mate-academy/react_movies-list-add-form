/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setiImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const isIncorrectValue = !title
  || !imdbId
  || !pattern.test(imgUrl)
  || !pattern.test(imdbUrl);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pattern.test(imgUrl) && pattern.test(imdbUrl)) {
      onAdd(newMovie);
      setCount(currCount => currCount + 1);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setiImdbUrl('');
      setImdbId('');
    }
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
        onChange={setImgUrl}
        required
        isValid={pattern.test(imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setiImdbUrl}
        required
        isValid={pattern.test(imdbUrl)}
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
            disabled={isIncorrectValue}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
