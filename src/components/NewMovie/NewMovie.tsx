import React, { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleEmpty = (value: string, callback: (val: string) => void) => {
    if (value === ' ') {
      return;
    }

    callback(value);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCount(prevCount => prevCount + 1);

    onAdd({
      title, description, imdbUrl, imdbId, imgUrl,
    });

    setTitle('');
    setDescription('');
    setImdbUrl('');
    setImdbId('');
    setImgUrl('');
  };

  const isDisabled = !title || !imdbUrl || !imdbId || !imgUrl;

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
        onChange={value => handleEmpty(value, setTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleEmpty(value, setDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => handleEmpty(value, setImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => handleEmpty(value, setImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => handleEmpty(value, setImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
