import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,

}

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const { 0: count, 1: setCount } = useState(0);
  const { 0: hasSomeError, 1: setHasSomeError } = useState(false);

  const { 0: title, 1: setTitle } = useState('');
  const { 0: description, 1: setDescription } = useState('');
  const { 0: imgUrl, 1: setImgUrl } = useState('');
  const { 0: imdbUrl, 1: setImdbUrl } = useState('');
  const { 0: imdbId, 1: setImdbId } = useState('');

  const canSubmit = title.trim() && imgUrl.trim()
    && imdbUrl.trim() && imdbId.trim() && !hasSomeError;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    resetForm();

    setCount(prev => prev + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        hasSomeError={setHasSomeError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        hasSomeError={setHasSomeError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        hasSomeError={setHasSomeError}
        url
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        hasSomeError={setHasSomeError}
        url
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        hasSomeError={setHasSomeError}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
