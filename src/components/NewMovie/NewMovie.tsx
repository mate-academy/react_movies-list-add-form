import React, { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
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

  type SubmitEvent = React.FormEvent<HTMLFormElement>;

  const reset = (): void => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const requiredFieldMiss = (): boolean => {
    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return true;
    }

    return false;
  };

  const onSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    if (requiredFieldMiss()) {
      return;
    }

    const newMovie: Movie = {
      title: title.trim(),
      imgUrl: imgUrl,
      imdbUrl: imdbUrl,
      imdbId: imdbId,
      description: description,
    };

    onAdd(newMovie);

    reset();
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={e => onSubmit(e)}>
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
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
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
            className="button is-link"
            disabled={requiredFieldMiss()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
