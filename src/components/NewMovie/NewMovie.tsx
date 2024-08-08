import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  const [imdbId, setImdbId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');

  const isFormValid = (): boolean => {
    return (
      title.trim() !== '' &&
      imgUrl.trim() !== '' &&
      imdbUrl.trim() !== '' &&
      imdbId.trim() !== ''
    );
  };

  const isValid = isFormValid();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        errorMessage="Please, enter valid image URL"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        errorMessage="Please, enter valid image URL IMDB"
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
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
