import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const state = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [inputState, setInputState] = useState(state);
  const [description, setDescription] = useState('');

  const disable = Object.values(inputState).some(
    value => value.trim().length <= 0,
  )
    ? true
    : false;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd({ ...inputState, description });

    setInputState(state);
    setCount(current => current + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={submit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputState.title}
        onChange={el => setInputState({ ...inputState, title: el })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={el => setDescription(el)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputState.imgUrl}
        onChange={el => setInputState({ ...inputState, imgUrl: el })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputState.imdbUrl}
        onChange={el => setInputState({ ...inputState, imdbUrl: el })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputState.imdbId}
        onChange={el => setInputState({ ...inputState, imdbId: el })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
