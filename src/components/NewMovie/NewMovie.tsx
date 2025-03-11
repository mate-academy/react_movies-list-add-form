import React from 'react';
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Prop {
  onAdd: (moveList: Movie) => void;
}

export const NewMovie: React.FC<Prop> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrlValue] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  function defaultValue() {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrlValue('');
    setImdbId('');
  }

  const inputValue: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const notRequired: string[] = ['description'];
  const valuesUrl: string[] = [imdbUrl, imgUrl];

  function handleValidUrl(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    const res = valuesUrl.every(value => pattern.test(value));

    if (res) {
      defaultValue();
      setCount(count + 1);
      onAdd(inputValue);
    }

    return res;
  }

  const disable = () => {
    let key: keyof Movie;

    for (key in inputValue) {
      const value = inputValue[key].trim();

      if (!notRequired.includes(key) && value.length === 0) {
        return true;
      }
    }

    return false;
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleValidUrl}>
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
        required
        onChange={setImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={setImdbUrlValue}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={setImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disable()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
