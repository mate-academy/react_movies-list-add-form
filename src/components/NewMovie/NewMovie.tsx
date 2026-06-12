import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputImgUrl, setInputImgUrl] = useState('');
  const [inputImdbUrl, setInputImdbUrl] = useState('');
  const [inputImdbId, setInputImdbId] = useState('');

  function handleFieldsReset() {
    setInputTitle('');
    setInputDescription('');
    setInputImgUrl('');
    setInputImdbUrl('');
    setInputImdbId('');
    setCount(prev => prev + 1);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMovie = {
      title: inputTitle,
      description: inputDescription,
      imgUrl: inputImgUrl,
      imdbUrl: inputImdbUrl,
      imdbId: inputImdbId,
    };

    onAdd(newMovie);
    handleFieldsReset();
  }

  const isDisabled =
    !inputTitle.trim() ||
    !inputImgUrl.trim() ||
    !inputImdbUrl.trim() ||
    !inputImdbId.trim();

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputTitle}
        onChange={newValue => setInputTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescription}
        onChange={newValue => setInputDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImgUrl}
        onChange={newValue => setInputImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputImdbUrl}
        onChange={newValue => setInputImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputImdbId}
        onChange={newValue => setInputImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
