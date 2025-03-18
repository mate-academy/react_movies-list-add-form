import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isValid =
    title.trim() &&
    imgUrl.trim() &&
    imdbUrl.trim() &&
    imdbId.trim() &&
    pattern.test(imgUrl) &&
    pattern.test(imdbUrl);

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    const newMovie: Movie = { title, description, imgUrl, imdbUrl, imdbId };

    onAdd(newMovie);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount((prevCount: number) => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSumbit}>
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
        validate={value => pattern.test(value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        validate={value => pattern.test(value)}
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
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
