import React, { useState, FormEvent } from 'react';
import classNames from 'classnames';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const fillInput
    = title
    && imgUrl
    && imdbUrl
    && imdbId;

  const correctImgUrl = pattern.test(imgUrl);
  const correctImdbUrl = pattern.test(imdbUrl);

  const correctUrl = correctImgUrl && correctImdbUrl;

  const notEmpty = /\S+/.test(title) && /\S+/.test(imdbId);

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onAddMovie = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fillInput && correctUrl && notEmpty) {
      resetFields();

      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      setCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onAddMovie}
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
        onChange={setImageUrl}
        correctUrl={correctImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        correctUrl={correctImdbUrl}
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
            className={classNames(
              'button is-link',
              {
                'button is-link is-light':
                  !fillInput
                  || !correctUrl
                  || !notEmpty,
              },
            )}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
