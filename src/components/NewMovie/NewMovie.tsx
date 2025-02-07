import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { title } from 'process';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const state = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [inputState, setInputState] = useState(state);
  const [description, setDescription] = useState('');
  const [blurredFields, setBlurredFields] = useState({ imdbId: false });

  const validateImdbId = (id: string) => {
    const imdbIdPattern = /^[a-zA-Z]{2}\d{7}$/;

    return imdbIdPattern.test(id);
  };

  const imdbIdError =
    blurredFields.imdbId && !validateImdbId(inputState.imdbId);

  const disable =
    Object.values(inputState).some(value => value.trim().length <= 0) ||
    imdbIdError;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd({ ...inputState, description });

    setInputState(state);

    setDescription('');

    setCount(current => current + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={submit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputState.title}
        onChange={e => setInputState({ ...inputState, title: e.target.value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputState.imgUrl}
        onChange={e => setInputState({ ...inputState, imgUrl: e.target.value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputState.imdbUrl}
        onChange={e =>
          setInputState({ ...inputState, imdbUrl: e.target.value })
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputState.imdbId}
        onChange={e => setInputState({ ...inputState, imdbId: e.target.value })}
        onBlur={() => setBlurredFields({ ...blurredFields, imdbId: true })}
        error={imdbIdError}
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
