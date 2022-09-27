import React, { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({onAdd}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCount(C => C + 1);

    onAdd({ title, description, imdbUrl, imdbId, imgUrl });
    
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
        onChange={(movieTitle) => setTitle(movieTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(movieDescription) => setDescription(movieDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(movieImgUrl) => setImgUrl(movieImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(movieImdbUrl) => setImdbUrl(movieImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(movieImdbId) => setImdbId(movieImdbId)}
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
