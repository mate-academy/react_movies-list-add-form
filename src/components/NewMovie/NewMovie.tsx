import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(movie: Movie): void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isValidImgUrl, setIsValidImgUrl] = useState(true);
  const [isValidImdbUrl, setIsValidImdbUrl] = useState(true);
  const validator = (url: string) => {
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-  +=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!pattern.test(url)) {
      return false;
    }

    return true;
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const addMovie = (event: React.SyntheticEvent) => {
    const movie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    event.preventDefault();

    setIsValidImgUrl(validator(imgUrl));
    setIsValidImdbUrl(validator(imdbUrl));

    if (validator(imgUrl) && validator(imdbUrl)) {
      onAdd(movie);
      setCount(current => current + 1);

      clearForm();
    }
  };

  const trimText = (text: string) => (
    text[0] === ' ' ? text.trim() : text
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(trimText(event.target.value))}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(trimText(event.target.value))}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(trimText(event.target.value));
          setIsValidImgUrl(true);
        }}
        required
        validation={isValidImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(trimText(event.target.value));
          setIsValidImdbUrl(true);
        }}
        required
        validation={isValidImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => setImdbId(trimText(event.target.value))}
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
