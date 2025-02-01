import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const state = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [inputsState, setInputsState] = useState(state);
  const [description, setDescription] = useState('');

  const disableButton = Object.values(inputsState).some(
    v => v.trim().length <= 0,
  )
    ? true
    : false;

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd({ ...inputsState, description });

    setInputsState(state);
    setCount(cur => cur + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={submitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputsState.title}
        onChange={e => setInputsState({ ...inputsState, title: e })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => setDescription(e)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputsState.imgUrl}
        onChange={e => setInputsState({ ...inputsState, imgUrl: e })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputsState.imdbUrl}
        onChange={e => setInputsState({ ...inputsState, imdbUrl: e })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputsState.imdbId}
        onChange={e => setInputsState({ ...inputsState, imdbId: e })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
