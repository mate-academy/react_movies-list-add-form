import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (Movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setHaveTitle] = useState('');
  const [description, setHaveDescription] = useState('');
  const [imageUrl, setHaveImageUrl] = useState('');
  const [imdbUrl, setHaveImdbUrl] = useState('');
  const [imdbId, setHaveImdbId] = useState('');

  function handleReset() {
    setHaveTitle('');
    setHaveDescription('');
    setHaveImageUrl('');
    setHaveImdbUrl('');
    setHaveImdbId('');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !imageUrl || !imdbUrl || !imdbId) {
      return;
    }

    const newMovie: Movie = {
      title: title,
      description: description,
      imgUrl: imageUrl,
      imdbUrl: imdbUrl,
      imdbId: imdbId,
    };

    onAdd(newMovie);
    setCount(currentCount => currentCount + 1);

    handleReset();
  }

  const isDisabled = !title || !imageUrl || !imdbUrl || !imdbId;

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit} noValidate>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setHaveTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setHaveDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChange={setHaveImageUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setHaveImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setHaveImdbId}
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
