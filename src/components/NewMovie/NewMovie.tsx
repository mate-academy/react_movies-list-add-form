import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: ((movie: Movie) => void)
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handlSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    });

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlSubmit}
      onReset={reset}
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
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => setImdbUrl(event.target.value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => setImdbId(event.target.value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={reset}
            disabled={title === ''}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
