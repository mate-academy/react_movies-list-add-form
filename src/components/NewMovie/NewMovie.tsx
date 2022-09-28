import React, { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd:(movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [formError, setFormError] = useState(true);

  const handleInput = (value: string, setValue: (value: string) => void) => {
    if (title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim()) {
      setFormError(false);
    }

    setValue(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(prevCount => prevCount + 1);
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
    setTitle('');
    setFormError(true);
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
        onChange={value => handleInput(value, setTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleInput(value, setDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => handleInput(value, setImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => handleInput(value, setImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => handleInput(value, setImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={formError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
