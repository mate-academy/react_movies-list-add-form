import React, { useState } from 'react';
import classNames from 'classnames';
import { TextField } from '../TextField';

type Props = {
  onAdd: (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const valid = title && imgUrl && imdbUrl && imdbId;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={e => {
        e.preventDefault();
        setCount(current => current + 1);
        setTitle('');
        setDescription('');
        setImgUrl('');
        setImdbUrl('');
        setImdbId('');

        // eslint-disable-next-line no-console
        console.log(Boolean(valid));
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        key={1}
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        key={2}
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        key={3}
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        key={4}
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        key={5}
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
            )}
            onClick={() => onAdd(
              title,
              description,
              imgUrl,
              imdbUrl,
              imdbId,
            )}
            disabled={Boolean(!valid)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
