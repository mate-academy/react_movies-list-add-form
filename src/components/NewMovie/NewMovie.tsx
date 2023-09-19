import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type MovieProps = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<MovieProps> = ({ onAdd }: MovieProps) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim()) {
      return;
    }

    const newMovie = {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    };

    onAdd(newMovie);

    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');

    setCount((prevCount) => prevCount + 1);
  };

  const isDisabled = () => {
    return !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();
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
            disabled={isDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
