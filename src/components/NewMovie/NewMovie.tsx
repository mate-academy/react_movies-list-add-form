import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isReadyToSubmit = [title, imgUrl, imdbUrl, imdbId]
    .every(item => item !== '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(prevState => prevState + 1);

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imdbId: imdbId.trim(),
      imdbUrl: imdbUrl.trim(),
      imgUrl: imgUrl.trim(),
    });

    [setTitle, setDescription, setImgUrl, setImdbUrl, setImdbId]
      .forEach(func => func(''));
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
        onChange={(value) => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Img URL"
        value={imgUrl}
        onChange={(value) => {
          setImgUrl(value);
        }}
        validate={(value) => {
          return pattern.test(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
        }}
        validate={(value) => {
          return pattern.test(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => {
          setImdbId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isReadyToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
