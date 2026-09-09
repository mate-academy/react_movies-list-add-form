import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const [count, setCount] = useState(0);

  /////////////////////////////////////

  const isFormValid = (): boolean => {
    return (
      newTitle.trim().length !== 0 &&
      newImage.trim().length !== 0 &&
      newImdbUrl.trim().length !== 0 &&
      newImdbId.trim().length !== 0
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const movie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImage,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    onAdd(movie);

    setCount(prevCount => prevCount + 1);

    setNewTitle('');
    setNewDescription('');
    setNewImage('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={newValue => setNewTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={newValue => setNewDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImage}
        onChange={newValue => setNewImage(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={newValue => setNewImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={setNewImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
