import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isValidUrl = (url: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const availablButton = title && imgUrl && imdbUrl && imdbId && isValidUrl;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCount(prevCount => prevCount + 1);
        setTitle('');
        setDescription('');
        setImgUrl('');
        setImdbUrl('');
        setImdbId('');

        const newMovie = {
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        };

        onAdd(newMovie);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => {
          setTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        isValidURL={isValidUrl}
        value={imgUrl}
        onChange={event => {
          setImgUrl(event);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        isValidURL={isValidUrl}
        value={imdbUrl}
        onChange={event => {
          setImdbUrl(event);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        isValidURL={isValidUrl}
        value={imdbId}
        onChange={event => {
          setImdbId(event);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!availablButton}
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
