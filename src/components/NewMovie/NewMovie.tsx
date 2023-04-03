import React, { useState } from 'react';
import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, SetCount] = useState(0);
  const [title, SetTitle] = useState('');
  const [imgUrl, SetImgUrl] = useState('');
  const [imdbUrl, SetImdbUrl] = useState('');
  const [imdbId, SetImdbId] = useState('');
  const [description, SetDescription] = useState('');

  const formClear = () => {
    SetTitle('');
    SetImgUrl('');
    SetImdbUrl('');
    SetImdbId('');
    SetDescription('');
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    });

    SetCount(prev => prev + 1);
    formClear();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={SetTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={SetDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={SetImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={SetImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={SetImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              Boolean(
                !title.trim()
                || !imgUrl.trim()
                || !imdbId.trim()
                || !imdbUrl.trim(),
              )
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
