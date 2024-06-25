import React from 'react';
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [valueTitle, setValueTitle] = useState('');

  const [valueDescription, setValueDescription] = useState('');

  const [valueImgUrl, setValueImgUrl] = useState('');

  const [valueImdbUrl, setValueImdbUrl] = useState('');

  const [valueImdbId, setValueImdbId] = useState('');

  const disabledReason =
    !valueTitle || !valueImgUrl || !valueImdbUrl || !valueImdbId;

  const resetValues = () => {
    setValueTitle('');
    setValueDescription('');
    setValueImgUrl('');
    setValueImdbUrl('');
    setValueImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: valueTitle,
      description: valueDescription,
      imgUrl: valueImgUrl,
      imdbUrl: valueImdbUrl,
      imdbId: valueImdbId,
    });

    resetValues();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={valueTitle}
        onChange={setValueTitle}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={valueDescription}
        onChange={setValueDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={valueImgUrl}
        onChange={setValueImgUrl}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={valueImdbUrl}
        onChange={setValueImdbUrl}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={valueImdbId}
        onChange={setValueImdbId}
        required
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledReason}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
