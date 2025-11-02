import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [valueDescription, setDescription] = useState('');
  const [valueImgUrl, setImgUrl] = useState('');
  const [valueImdbUrl, setImdbUrl] = useState('');
  const [valueImdbId, setImdbId] = useState('');
  const [valueTitle, setTitle] = useState('');

  const setNewDescription = (changedValue: string) =>
    setDescription(changedValue);
  const setNewImgUrl = (changedValue: string) => setImgUrl(changedValue);
  const setNewImdbUrl = (changedValue: string) => setImdbUrl(changedValue);
  const setNewImdbId = (changedValue: string) => setImdbId(changedValue);
  const setNewTitle = (changedValue: string) => setTitle(changedValue);

  const formClear = () => {
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
    setNewTitle('');
  };

  const preventSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: valueTitle,
      description: valueDescription,
      imdbId: valueImdbId,
      imdbUrl: valueImdbUrl,
      imgUrl: valueImgUrl,
    });

    formClear();
    setCount(prev => prev + 1);
  };

  const preventReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    formClear();
    setCount(prev => prev + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => preventSubmit(event)}
      onReset={event => preventReset(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={valueTitle}
        onChange={setNewTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={valueDescription}
        onChange={setNewDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={valueImgUrl}
        onChange={setNewImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={valueImdbUrl}
        onChange={setNewImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={valueImdbId}
        onChange={setNewImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !valueTitle.trim() ||
              !valueImdbId.trim() ||
              !valueImgUrl.trim() ||
              !valueImdbUrl.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
      {(valueTitle.trim() ||
        valueImdbId.trim() ||
        valueImgUrl.trim() ||
        valueImdbUrl.trim() ||
        valueDescription.trim()) && (
        <div className="field is-grouped">
          <div className="control">
            <button
              type="reset"
              data-cy="reset-button"
              className="button is-link"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
