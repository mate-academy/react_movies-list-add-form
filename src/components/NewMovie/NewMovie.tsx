import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(movie: Movie): void;
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
  const [validImgUrl, setValidImgUrl] = useState(true);
  const [validImdbUrl, setValidImdbUrl] = useState(true);

  const validator = (url: string) => {
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-  +=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!pattern.test(url)) {
      return false;
    }

    return true;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event: React.SyntheticEvent) => {
        const movie: Movie = {
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        };

        event.preventDefault();

        setValidImgUrl(validator(imgUrl));
        setValidImdbUrl(validator(imdbUrl));

        if (validator(imgUrl) && validator(imdbUrl)) {
          onAdd(movie);
          setCount(current => current + 1);

          setTitle('');
          setDescription('');
          setImgUrl('');
          setImdbUrl('');
          setImdbId('');
        }
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
          setValidImgUrl(true);
        }}
        required
        validation={validImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
          setValidImdbUrl(true);
        }}
        required
        validation={validImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => setImdbId(event.target.value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={(
              title === '' || imgUrl === '' || imdbUrl === '' || imdbId === ''
            )}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
